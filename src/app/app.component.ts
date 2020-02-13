import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        //console.log("In App Logout" + this.currentUser.username);
        var response = this.authenticationService.logout();
        console.log("Response from logout: "+ response);
        if(response = "Success")   
            this.router.navigate(['/login']);
    }
}