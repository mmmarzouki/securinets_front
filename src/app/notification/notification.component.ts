import {Component, Input, OnInit} from '@angular/core';
import {Submission} from '../model/submission';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input()
  submission: Submission;

  constructor() { }

  ngOnInit() {
  }

}
