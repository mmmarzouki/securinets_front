import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Status, Submission} from '../model/submission';
import {SubmissionService} from '../services/submission.service';

@Component({
  selector: 'app-judge-report',
  templateUrl: './judge-report.component.html',
  styleUrls: ['./judge-report.component.scss']
})
export class JudgeReportComponent implements OnInit {

  @Input()
  submission: Submission;
  @Input()
  submissions: Submission[];
  @Output()
  numberPendingChange = new EventEmitter<number>();
  @Input()
  changePendingNumber: () => void;

  constructor(private modalService: NgbModal) { }

  open() {
    const modal = this.modalService.open(JudgeReportContentComponent);
    modal.componentInstance.submission = this.submission;
    modal.componentInstance.submissions = this.submissions;
    modal.componentInstance.changePendingNumber = this.changePendingNumber;
  }

  ngOnInit() {
  }

}


@Component({
  selector: 'app-judge-report-content',
  templateUrl: './judge-report-content.html',
})
export class JudgeReportContentComponent {

  @Input()
  numberPending: number;
  @Input()
  submission: Submission;
  @Input()
  submissions: Submission[];
  @Output()
  numberPendingChange = new EventEmitter<number>();

  @Input()
  changePendingNumber: () => void;

  isAccepted = false;

  constructor(public activeModal: NgbActiveModal, private submissionService: SubmissionService) {
  }
  send() {
    const isPending = this.submission.status === Status.Pending;
    if (this.isAccepted) {
      this.submission.status = Status.Accepted;
    } else {
      this.submission.status = Status.Rejected;
      this.submission.score = 0;
    }
    this.submissionService.judge(this.submission).subscribe(res => {
      if (isPending) {
          this.changePendingNumber();
      }
    });
  }
  setAccepted(value: boolean) {
    this.isAccepted = value
  }
}

