import {Team} from './team';

enum Status {
    Accepted,
    Rejected,
    Pending,
    BeingJudged
}

export class Submission {
    constructor(
        public id: number,
        public team: Team,
        public time: string,
        public status: Status
    ) {}
}
