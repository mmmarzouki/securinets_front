import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../model/team';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalContent} from '../components/modal/modal.component';
import {SubmissionService} from '../services/submission.service';
import {Submission} from '../model/submission';

@Component({
  selector: 'app-upload-file-content',
  templateUrl: './upload-file-content.html',
})
export class UploadFileContentComponent{

  @Input() team: Team;
  @Input() submissions: Submission[];

  file: any;

  constructor(public activeModal: NgbActiveModal, private submissionService: SubmissionService) {}

  setFile(event) {
    this.file = event.target.files[0];
  }

  send() {
    const formData = new FormData();
    formData.append('teamName', this.team.name);
    formData.append('file', this.file);
    console.log(formData);
    this.submissionService.submit(formData).subscribe(res => {
      this.submissions.push(res);
    });
  }
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  @Input()
  team: Team;
  @Input()
  submissions: Submission[];

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  open() {
    const modal = this.modalService.open(UploadFileContentComponent);
    modal.componentInstance.team = this.team;
    modal.componentInstance.submissions = this.submissions;
  }
}
