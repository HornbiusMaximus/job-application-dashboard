import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { TimelineLite, Expo, Power2 } from 'gsap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
	selector: 'app-filter-menu',
	templateUrl: './filter-menu.component.html',
	styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent implements OnInit {
	@Input() positions$: Observable<string[]>;
	@Output() applyFilter = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	filterApplicationList(formValues) {
		const filteredObject = _.pickBy(formValues, val => val);
		const filterOn = Object.keys(filteredObject);
		const filtersChecked = filterOn.length ? true : false;

		this.applyFilter.next({filterOn, filtersChecked});
	}

	positionId(position: string) {
		return `${position.toLowerCase()}-checkbox`;
	}

}
