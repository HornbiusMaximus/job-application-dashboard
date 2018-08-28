import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { DashboardModule } from './dashboard';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		CoreModule,
		DashboardModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
