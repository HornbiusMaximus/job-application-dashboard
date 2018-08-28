import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { COMPONENTS } from './components';
import { FilterMenuComponent } from './components/filter-menu/filter-menu.component';
import { SortMenuComponent } from './components/sort-menu/sort-menu.component';
import { ListMenuShellComponent } from './components/list-menu-shell/list-menu-shell.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SharedModule
	],
	declarations: [DashboardComponent, COMPONENTS, FilterMenuComponent, SortMenuComponent, ListMenuShellComponent],
	exports: [DashboardComponent, COMPONENTS]
})
export class DashboardModule { }
