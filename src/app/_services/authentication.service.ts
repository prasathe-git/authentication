import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../_models';

//import { ConstantsService } from '../common/services/constants.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, /*private _constant: ConstantsService*/) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
        //this.currentUserSubject = new BehaviorSubject<User>(this._constant.getUserData());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`http://finsudev.westindia.cloudapp.azure.com:9000/api/public/authenticate`, 
            { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    //this._constant.setUserData(user);
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout(){
        // remove user from local storage to log user out
        
       return this.http.post(`http://finsudev.westindia.cloudapp.azure.com:9000/api/public/logout`
        ,{}).pipe(map((response)=>{
            debugger;
            console.log(response);
            sessionStorage.removeItem('currentUser');
            //this._constant.removeItem();
            this.currentUserSubject.next(null);
            return "Success";
        }),catchError((error)=>{
            console.log(error);
            sessionStorage.removeItem('currentUser');
            //this._constant.removeItem();
            this.currentUserSubject.next(null);    
            return error;
        }));
        
        /*subscribe((response)=>{
            debugger;
            console.log(response)
        })*/
        
        /*.toPromise();
        console.log("Promise:  "+promise);
        promise.then((data) => {
            console.log("Promise resolved with: " + JSON.stringify(data));
            return "Success";
        }).catch((error) => {
            console.log("Promise rejected with: " + JSON.stringify(error));
            return "Error"
        })*/
/*            if(response) {
                sessionStorage.removeItem('currentUser');
                //this._constant.removeItem();
                this.currentUserSubject.next(null);
                return "Success";
            }
            else
                return "Error";*/
        //}));
//        return "Success";
    }
}