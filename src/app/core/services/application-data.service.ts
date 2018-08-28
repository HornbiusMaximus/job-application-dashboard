import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import applicationData from './application-data.json';

@Injectable()
export class ApplicationDataService {
	getApplications(): Observable<any> {
		return of(applicationData);
	}
}
