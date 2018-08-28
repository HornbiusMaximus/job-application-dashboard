import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Application } from '@app/core/models';
import { TweenLite, Expo, TimelineLite, Power2 } from 'gsap';

@Component({
	selector: 'app-application-details-card',
	templateUrl: './application-details-card.component.html',
	styleUrls: ['./application-details-card.component.scss']
})
export class ApplicationDetailsCardComponent implements OnInit {
	@Input() _application: Application;
	availableDays: number[];
	weekdays: string[] = [
		'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'
	];

	@Input()
	set application(app) {
		this._application = app;
		this.availableDays = Object.values(app.availability);
	}

	constructor(private elementRef: ElementRef) {}

	ngOnInit() {
	}

	isAvailable(day: number) {
		return day > 0 ? 'available' : '';
	}

	animateCardIn() {
		return new TimelineLite()
			.set(this.elementRef.nativeElement, {clearProps: 'all', immediateRender: false})
			.to(this.elementRef.nativeElement, 1, {autoAlpha: 1, x: 0, force3D: true, ease: Expo.easeOut});
			// .to(this.elementRef.nativeElement, 0.35, {scaleX: 1, scaleY: 1, force3D: true, ease: Expo.easeOut}, 0.1);
	}

	animateCardOut() {
		return new TimelineLite()
			.to(this.elementRef.nativeElement, 0.35, {autoAlpha: 0, scaleX: 0.95, scaleY: 0.95, force3D: true, ease: Expo.easeIn});
	}

}
