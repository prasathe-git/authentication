import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Observable} from 'rxjs';

import { User } from '../_models';
import { ReportData } from '../_models';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stringify } from 'querystring';

@Injectable({ providedIn: 'root' })
export class UserService {
    isError: boolean;

    constructor(private http: HttpClient) { }

    values: any;
    errorMessage: String;
    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }

    validateUser(type: string) {
        if(type == "Buyer")
            return this.http.get<ReportData>(`http://finsudev.westindia.cloudapp.azure.com:9000/api/public/buyer/reports`);    
        if(type == "Seller")
            return this.http.get<ReportData>(`http://finsudev.westindia.cloudapp.azure.com:9000/api/public/seller/reports`);
        if(type == "Common")
            return this.http.get<ReportData>(`http://finsudev.westindia.cloudapp.azure.com:9000/api/public/common/reports`);
    }
}