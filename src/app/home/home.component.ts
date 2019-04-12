import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SubmissionService} from '../services/submission.service';
import {Status, Submission} from '../model/submission';
import {Team} from '../model/team';

import * as fileSaver from 'file-saver';

import {PerfectScrollbarComponent, PerfectScrollbarConfigInterface, PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {interval} from 'rxjs';
import {NotificationComponent} from '../notification/notification.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

    timeoutFunction: any;
    submissions: Submission[] = []
    public config: PerfectScrollbarConfigInterface = {};

    team: Team = {id: 0, name: '', password: '', score: 0};

    @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
    @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;

    constructor(private router: Router, private submissionService: SubmissionService, private modalService: NgbModal) {
    }

    ngOnInit() {
        const team = JSON.parse(localStorage.getItem('team'));
        if (!team) {
            this.router.navigate(['login'])
        }
        this.team = team;
        this.submissionService.findByTeam(this.team.id).subscribe(res => {
            this.submissions = res;
        });
        this.timeoutFunction = interval(5000).subscribe(x => {
            this.submissionService.findByTeam(this.team.id).subscribe(res => {
                const missing = res.filter(item => {
                    for (let i = 0; i < this.submissions.length ; i++) {
                        if (item.id === this.submissions[i].id && this.submissions[i].status === Status.Pending && item.status !== Status.Pending) {
                            return true;
                        }
                    };
                    return false;
                });
                console.log(missing.length);
                missing.forEach(item => {
                    this.team.score += item.score;
                    localStorage.setItem('team', JSON.stringify(this.team));
                    this.openModal(item);
                });
                this.submissions = res;
            })
        });
    }

    openModal(sub: Submission) {
        const modal = this.modalService.open(NotificationComponent);
        modal.componentInstance.submission = sub;
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
    }

    showFile(id: number) {
        this.submissionService.downloadPDF(id).subscribe((blob: Blob) => {
            fileSaver.saveAs(blob, 'report' + id + '.pdf');
        })
    }

    ngOnDestroy(): void {
        this.timeoutFunction.unsubscribe();
    }
}
