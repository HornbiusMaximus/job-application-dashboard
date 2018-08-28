import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	ViewChild,
	ElementRef,
	AfterViewInit,
	NgZone,
	ViewChildren,
	QueryList,
	OnChanges,
	HostListener
} from '@angular/core';
import { TweenLite, TimelineLite, Expo, TweenMax, Back, Power2 } from 'gsap';
import { faFilter, faSort, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

import { ApplicationDataService } from '@app/core/services';
import { ApplicationDetailsCardComponent, ApplicationListItemComponent, ListMenuShellComponent } from '../../components';
import { Application } from '@app/core/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	@ViewChild('listShell') private _listShell: ElementRef;
	@ViewChild('detailsShell') private _detailsShell: ElementRef;
	@ViewChild('detailsIntroText') private _detailsIntroText: ElementRef;
	@ViewChild(ListMenuShellComponent) private listMenuShellComponent: ListMenuShellComponent;
	@ViewChild(ApplicationDetailsCardComponent) private detailsCardComponent: ApplicationDetailsCardComponent;
	@ViewChild(ApplicationListItemComponent) private listItemComponent: ApplicationListItemComponent;
	@ViewChildren(ApplicationListItemComponent, {read: ElementRef}) private _listItems: QueryList<ElementRef>;

	jobApplications$ = this.applicationDataSrvc.getApplications();
	applicationsList$: Observable<Application>;
	positions$: Observable<string[]>;

	innerWidth: any;
	selectedApplication: Application = null;
	currentListItemIndex: number;
	filtersChecked = false;
	filterOn: string[] = [];
	filterIcon = faFilter;
	sortIcon = faSort;
	detailsBackIcon = faArrowCircleLeft;
	selectedListMenu: string;

	sortObj = {
		sortOn: 'name',
		sortDirection: 'ASC'
	};

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.innerWidth = window.innerWidth;
	}

	get listShell() {
		return this._listShell;
	}

	get detailsShell() {
		return this._detailsShell.nativeElement;
	}

	get selectedApplicationData() {
		return this.selectedApplication || {id: 0};
	}

	get detailsIntroText() {
		return this._detailsIntroText.nativeElement;
	}

	get listItems() {
		return this._listItems['_results'].map((element) => element.nativeElement);
	}

	constructor(
		private applicationDataSrvc: ApplicationDataService,
		private zone: NgZone
	) {
		this.applicationsList$ = this.jobApplications$.pipe(
			map(arr => {
				const filteredList = arr.filter(app => this.filterOn.includes(app.position) || !this.filtersChecked);
				const sortedList = filteredList.sort((s1, s2) => this.sortArrayAsc(s1, s2));
				if (this.sortObj.sortDirection === 'DESC') {
					sortedList.reverse();
				}

				return sortedList;
			})
		);

		this.positions$ = this.jobApplications$.pipe(
			map(arr => {
				const positionsArr = arr.map(app => app.position);
				return positionsArr.filter((value, index, array) => array.indexOf(value) === index);
			})
		);
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
	}

	windowSize() {
		return this.screenIsSmall() ? 'stacked' : '';
	}

	screenIsSmall() {
		return this.innerWidth < 768;
	}

	backToList() {
		new TimelineLite()
			.to(this.detailsShell, 0.5, {x: '100%', force3D: true, ease: Expo.easeIn})
			.call(() => this.selectedApplication = null)
			.set(this.detailsShell, {clearProps: 'all'});
	}

	sortArrayAsc(sort1: Application, sort2: Application) {
		const sortField = this.sortObj.sortOn;

		if (sort1[sortField] > sort2[sortField]) {
			return 1;
		} else if (sort1[sortField] === sort2[sortField]) {
			return 0;
		} else {
			return -1;
		}
	}

	openListMenu(menuType: string) {
		this.selectedListMenu = menuType;
		this.listMenuShellComponent.animateMenuIn();
	}

	listMenuSelected() {
		return this.selectedListMenu === 'filter' ? 'hide-sort-menu' : 'hide-filter-menu';
	}

	filterApplicationsList(filterObj) {
		this.listMenuShellComponent.animateMenuOut();

		this.filterOn = filterObj.filterOn;
		this.filtersChecked = filterObj.filtersChecked;
		if (this.selectedApplication ||
			(this.filtersChecked && this.selectedApplication)
		) { this.clearSelection(); }

		this.applicationsList$ = this.applicationsList$.pipe(map(arr => arr));
	}

	sortApplicationsList(sortObj) {
		this.listMenuShellComponent.animateMenuOut();

		this.sortObj = sortObj;
		if (this.selectedApplication ||
			(this.filtersChecked && this.selectedApplication)
		) { this.clearSelection(); }

		this.applicationsList$ = this.applicationsList$.pipe(map(arr => arr));
	}

	selectApplication(application: Application, index: number) {
		if (application === this.selectedApplication) {
			return;
		}

		if (this.screenIsSmall()) {
			this.updateSelectedApplication(application, index);
			TweenLite.to(this.detailsShell, 0.75, {x: 0, force3D: true, ease: Expo.easeOut});
		} else {
			if (this.currentListItemIndex >= 0) {
				const listItemIndex = (this.currentListItemIndex + 1) > this.listItems.length ? 0 : this.currentListItemIndex;
				const currentListItemTarget = this.listItems[listItemIndex].firstChild;
				this.listItemComponent.animateDeselection(currentListItemTarget);
			}

			const newListItemTarget = this.listItems[index].firstChild;
			this.listItemComponent.animateSelection(newListItemTarget);

			if (this.selectedApplication) {
				new TimelineLite()
					.add(this.detailsCardComponent.animateCardOut())
					.call(() => {
						this.updateSelectedApplication(application, index);
					})
					.add(this.detailsCardComponent.animateCardIn(), '+=0.25');
			} else {
				this.updateSelectedApplication(application, index);
				this.firstSelectedApplication();
			}
		}
	}

	clearSelection() {
		const listItemIndex = (this.currentListItemIndex + 1) > this.listItems.length ? 0 : this.currentListItemIndex;
		const currentListItemTarget = this.listItems[listItemIndex].firstChild;

		new TimelineLite()
			.add(this.detailsCardComponent.animateCardOut(), 'sync')
			.add(this.listItemComponent.animateDeselection(currentListItemTarget), 'sync')
			.call(() => this.selectedApplication = null);
	}

	firstSelectedApplication() {
		new TimelineLite()
			.add(this.animateIntroTextOut())
			.add(() => this.zone.run(() => {
				this.detailsCardComponent.animateCardIn();
			}));
	}

	updateSelectedApplication(application: Application, index: number) {
		this.selectedApplication = application;
		this.currentListItemIndex = index;
	}

	isSelected(application) {
		return application === this.selectedApplication ? 'selected' : '';
	}

	animateIntroTextOut() {
		return new TimelineLite()
			.to(this.detailsIntroText, 0.25, {autoAlpha: 0, force3D: true, ease: Expo.easeIn});
	}

}
