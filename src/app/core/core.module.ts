import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';

import { SERVICES } from './services';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	providers: [SERVICES],
	declarations: []
})
export class CoreModule { }
