import { Component, OnInit, Input } from '@angular/core';
import { faStar as selectedIcon } from '@fortawesome/free-solid-svg-icons';
import { faStar as deselectedIcon } from '@fortawesome/free-regular-svg-icons';

@Component({
	selector: 'app-star-icon',
	templateUrl: './star-icon.component.html',
	styleUrls: ['./star-icon.component.scss']
})
export class StarIconComponent implements OnInit {
	@Input() selected;
	starIconSelected = selectedIcon;
	starIconDeselected = deselectedIcon;

	constructor() { }

	ngOnInit() {
	}

}
