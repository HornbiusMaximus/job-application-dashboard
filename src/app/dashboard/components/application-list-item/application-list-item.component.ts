import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';
import { TweenLite, Expo, Back, TimelineLite } from 'gsap';
import { Application } from '@app/core/models';

@Component({
	selector: 'app-application-list-item',
	templateUrl: './application-list-item.component.html',
	styleUrls: ['./application-list-item.component.scss']
})
export class ApplicationListItemComponent implements OnInit {
	@Input() application;
	appSaved = false;
	savedApps = JSON.parse(localStorage.getItem('savedApps')) || {};

	constructor(private elementRef: ElementRef) { }

	ngOnInit() {
		this.appSaved = this.isAlreadySaved(this.application) ? true : false;
	}

	toggleSaveApplication(event: any) {
		event.stopPropagation();

		if (this.isAlreadySaved(this.application)) {
			const duplicateApp = _.pickBy(this.savedApps, app => {
				return app.name === this.application.name &&
					app.position === this.application.position &&
					app.applied === this.application.applied;
			});

			const appKey = Object.keys(duplicateApp)[0];
			delete this.savedApps[appKey];
			this.appSaved = false;
		} else {
			this.savedApps[uuid()] = this.application;
			this.appSaved = true;
		}

		localStorage.setItem('savedApps', JSON.stringify(this.savedApps));
	}

	isAlreadySaved(application) {
		const storageStr = localStorage.getItem('savedApps') || '';
		return storageStr.indexOf(JSON.stringify(application)) !== -1 ? true : false;
	}

	deselect(target: any[]) {
		return TweenLite.set(target, {className: '-=selected'});
	}

	animateSelection(target: any) {
		const duration = 0.35;
		const cardBgTarget = target.firstChild;

		return new TimelineLite()
			.to(target, duration, {className: '+=selected', ease: Back.easeInOut.config(2)}, 'sync')
			.to(cardBgTarget, duration, {autoAlpha: 1, ease: Back.easeInOut.config(2)}, 'sync');
	}

	animateDeselection(target: any) {
		const duration = 0.35;
		const cardBgTarget = target.firstChild;

		return new TimelineLite()
			.to(target, duration, {className: '-=selected', ease: Back.easeInOut.config(1)}, 'sync')
			.to(cardBgTarget, duration, {autoAlpha: 0, ease: Back.easeInOut.config(1)}, 'sync');
	}

}
