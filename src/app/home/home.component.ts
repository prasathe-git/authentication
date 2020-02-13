import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User, ReportData } from '../_models';
import { UserService, AuthenticationService } from '../_services';
import { stringify } from 'querystring';
import { HttpResponse } from '@angular/common/http';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    returnUrl: string;
    isError: boolean;
    returnValue: string;
    isClicked: boolean;
    message: string;
    ret: HttpResponse<any>;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService

    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {}

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
    authenticateBuyer() {
        this.userService.validateUser("Buyer")
        .subscribe((data: ReportData)=> {this.isError=false;this.isClicked=true;console.log("Success");},
        (error)=>{this.isError=true;this.isClicked=true;console.log("Error");});
    }
    authenticateSeller() {
        this.userService.validateUser("Seller")
        .subscribe((data: ReportData)=> {this.isError=false;this.isClicked=true;console.log("Success");},
        (error)=>{this.isError=true;this.isClicked=true;console.log("Error");});
    }
    authenticateCommon() {
        this.userService.validateUser("Common")
        .subscribe((data: ReportData)=> {this.isError=false;this.isClicked=true;console.log("Success");},
        (error)=>{this.isError=true;this.isClicked=true;console.log("Error");});
    }
}