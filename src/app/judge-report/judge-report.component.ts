import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Submission} from '../model/submission';
import {UploadFileContentComponent} from '../upload-file/upload-file.component';
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
  submissions: Submission[]

  constructor(private modalService: NgbModal) { }

  open() {
    const modal = this.modalService.open(JudgeReportContentComponent);
    modal.componentInstance.submission = this.submission;
    modal.componentInstance.submissions = this.submissions;
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
  submission: Submission;
  @Input()
  submissions: Submission[]

  constructor(public activeModal: NgbActiveModal, private submissionService: SubmissionService) {
  }
}

