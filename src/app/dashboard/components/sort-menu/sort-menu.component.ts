import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-sort-menu',
	templateUrl: './sort-menu.component.html',
	styleUrls: ['./sort-menu.component.scss']
})
export class SortMenuComponent implements OnInit {
	@Input() currentSort;
	@Output() applySort = new EventEmitter();
	arrowUpIcon = faArrowUp;
	arrowDownIcon = faArrowDown;
	defaultState = 'btn-dark';
	selectedState = 'btn-success';

	constructor() { }

	ngOnInit() {
	}

	updateSorting(sortOn: string, sortDirection: string) {
		this.applySort.next({sortOn, sortDirection});
	}

	isActive(field: string, direction: string) {
		return this.currentSort.sortOn === field &&
				this.currentSort.sortDirection === direction ? this.selectedState : this.defaultState;
	}

}
