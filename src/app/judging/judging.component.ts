import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Status, Submission} from '../model/submission';
import {PerfectScrollbarComponent, PerfectScrollbarConfigInterface, PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';
import {Team} from '../model/team';
import {Router} from '@angular/router';
import {SubmissionService} from '../services/submission.service';

import * as fileSaver from 'file-saver';
import {interval} from 'rxjs';

@Component({
    selector: 'app-judging',
    templateUrl: './judging.component.html',
    styleUrls: ['./judging.component.scss']
})
export class JudgingComponent implements OnInit, OnDestroy {

    textDanger = 'text-danger'
    pendingNumber = 0;

    timeoutFunction: any;

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
        this.submissionService.findAll().subscribe(res => {
            this.submissions = res;
            this.pendingNumber = res.filter(s => {
                return s.status === Status.Pending
            }).length;
        })
        this.timeoutFunction = interval(69000).subscribe(x => {
            this.submissionService.findAll().subscribe(res => {
                this.submissions = res;
                this.pendingNumber = res.filter(s => {
                    return s.status === Status.Pending
                }).length;
            })
        })
    }

    ngOnDestroy(): void {
        this.timeoutFunction.unsubscribe();
    }

    updatePendingNumber() {
        console.log(this);
        this.pendingNumber = this.submissions.filter(s => {
            return s.status === Status.Pending
        }).length;
    }

    disconnect() {
        localStorage.removeItem('team');
        this.router.navigate(['login'])
    }

    sortBy(param: string) {
        if (param === 'time') {
            this.submissions.sort((s1, s2) => {
                if (s1 > s2) {
                    return 1
                }
                return -1
            });
        }
        if (param === 'score') {
            this.submissions.sort((s1, s2) => {
                if (s1.score > s2.score) {
                    return 1
                }
                return -1
            });
        }
        if (param === 'status') {
            this.submissions.sort((s1, s2) => {
                if (s1.status > s2.status) {
                    return 1
                }
                return -1
            });
        }
        if (param === 'team id') {
            this.submissions.sort((s1, s2) => {
                if (s1.team.id > s2.team.id) {
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
