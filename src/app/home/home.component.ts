import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SubmissionService} from '../services/submission.service';
import {Submission} from '../model/submission';
import {Team} from '../model/team';

import * as fileSaver from 'file-saver';

import { PerfectScrollbarConfigInterface,
    PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import {UploadFileContentComponent} from '../upload-file/upload-file.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {interval} from 'rxjs';
import {NotificationComponent} from '../notification/notification.component';
import {forEach} from '@angular/router/src/utils/collection';

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
        this.team = JSON.parse(localStorage.getItem('team'));
        if (this.team === null) {
            this.router.navigate(['login'])
        }
        this.submissionService.findByTeam(this.team.id).subscribe(res => {
            this.submissions = res;
        });
        this.timeoutFunction = interval(69000).subscribe(x => {
            this.submissionService.findByTeam(this.team.id).subscribe( res => {
                if (res.length > this.submissions.length) {
                    const missing = res.filter(item =>  this.submissions.indexOf(item) < 0);
                    missing.forEach(item => {
                        this.team.score += item.score;
                        localStorage.setItem('team', JSON.stringify(this.team));
                        this.openModal(item);
                    })
                }
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

    ngOnDestroy(): void {
        this.timeoutFunction.unsubscribe();
    }
}
