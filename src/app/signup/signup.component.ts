import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Team} from '../model/team';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    teamForm: Team= new Team('', '');

    constructor(private router: Router) { }

    ngOnInit() {
        const team = localStorage.getItem('team');
        if (team != null) {
            this.router.navigate(['login'])
        }
    }

    login() {
        console.log(this.teamForm)
        localStorage.setItem('team', JSON.stringify(this.teamForm));
        this.router.navigate(['/home'])
    }
}
