import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { TimelineLite, Expo, Power2 } from 'gsap';

@Component({
	selector: 'app-list-menu-shell',
	templateUrl: './list-menu-shell.component.html',
	styleUrls: ['./list-menu-shell.component.scss']
})
export class ListMenuShellComponent implements OnInit {
	@ViewChild('listMenu') private _listMenu: ElementRef;
	@ViewChild('shade') private _shade: ElementRef;

	filterBackIcon = faArrowCircleLeft;

	get shade() {
		return this._shade.nativeElement;
	}

	get listMenu() {
		return this._listMenu.nativeElement;
	}

	constructor() { }

	ngOnInit() {
	}

	closeListMenu() {
		this.animateMenuOut();
	}

	animateMenuIn() {
		return new TimelineLite()
			.to(this.listMenu, 0.75, { x: 0, force3D: true, ease: Expo.easeOut }, 'sync')
			.add(this.animateListShadeIn(), 'sync');
	}

	animateMenuOut() {
		return new TimelineLite()
			.to(this.listMenu, 0.5, { x: '-110%', force3D: true, ease: Power2.easeIn }, 'sync')
			.add(this.animateListShadeOut(), 'sync')
			.set(this.listMenu, { clearProps: 'all' });
	}

	animateListShadeIn() {
		return new TimelineLite()
			.to(this.shade, 0.5, { autoAlpha: 1 });
	}

	animateListShadeOut() {
		return new TimelineLite()
			.to(this.shade, 0.5, { autoAlpha: 0 });
	}

}
