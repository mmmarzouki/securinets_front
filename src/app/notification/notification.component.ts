import {Component, Input, OnInit} from '@angular/core';
import {Status, Submission} from '../model/submission';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input()
  submission: Submission;

  constructor(public activeModal: NgbActiveModal) { }

  isAccepted(): boolean {
    return this.submission.status === Status.Accepted
  }

  isRejected(): boolean {
    return this.submission.status === Status.Rejected
  }

  ngOnInit() {
  }

}
