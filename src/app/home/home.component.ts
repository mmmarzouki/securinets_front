import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SubmissionService} from '../services/submission.service';
import {Submission} from '../model/submission';
import {Team} from '../model/team';

import * as fileSaver from 'file-saver';

import { PerfectScrollbarConfigInterface,
    PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    submissions: Submission[] = []
    public config: PerfectScrollbarConfigInterface = {};

    team: Team = {id: 0, name: '', password: '', score: 0};

    @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
    @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;

    constructor(private router: Router, private submissionService: SubmissionService) {
    }
    ngOnInit() {
        this.team = JSON.parse(localStorage.getItem('team'));
        if (this.team === null) {
            this.router.navigate(['login'])
        }
        this.submissionService.findByTeam(this.team.id).subscribe(res => {
            this.submissions = res;
        })
    }

    disconnect() {
        localStorage.removeItem('team');
        this.router.navigate(['login'])
    }
    sortBy(param: string) {
        if (param === 'time' ) {
            this.submissions.sort((s1, s2) => {
                if (s1 > s2) {
                    return 1
                }
                return -1
            });
        }
        if (param === 'score' ) {
            this.submissions.sort((s1, s2) => {
                if (s1.score > s2.score) {
                    return 1
                }
                return -1
            });
        }
        if (param === 'status' ) {
            this.submissions.sort((s1, s2) => {
                if (s1.status > s2.status) {
                    return 1
                }
                return -1
            });
        }
    }

    showFile(id: number) {
        this.submissionService.downloadPDF(id).subscribe((blob: Blob) => {
            fileSaver.saveAs(blob, 'report' + id + '.pdf');
        })
    }
}
