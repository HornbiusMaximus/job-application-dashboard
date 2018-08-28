import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { COMPONENTS } from './components';

@NgModule({
	imports: [
		CommonModule,
		FontAwesomeModule
	],
	declarations: [COMPONENTS],
	exports: [COMPONENTS, FontAwesomeModule],
})
export class SharedModule { }
