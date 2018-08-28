import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-application-details-field',
	templateUrl: './application-details-field.component.html',
	styleUrls: ['./application-details-field.component.scss']
})
export class ApplicationDetailsFieldComponent implements OnInit {
	@Input() label: string;
	@Input() value?: any;
	@Input() valueArray?: string[];

	constructor() { }

	ngOnInit() {
	}

}
