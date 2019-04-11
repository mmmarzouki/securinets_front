import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Team} from '../model/team';
import {TeamService} from '../services/team.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    isWrong= ' ';
    teamForm: Team= new Team('', '');
    hasDanger= ' ';
    hidden= false;

    constructor(private router: Router, private teamService: TeamService) { }

    ngOnInit() {
        const team = localStorage.getItem('team');
        if (team != null) {
            this.router.navigate(['login'])
        }
    }

    login() {
        this.isWrong = ' ';
        this.hasDanger = ' ';
        this.hidden = false;
        this.teamService.login(this.teamForm).subscribe(team => {
            console.log(team);
           if ( team === null || team === null ) {
               this.hasDanger = 'has-danger';
               this.isWrong = 'form-control-danger';
               this.hidden = true;
           } else {
               localStorage.setItem('team', JSON.stringify(team));
               this.router.navigate(['/home']);
           }
        });
    }
}
