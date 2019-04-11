import {Team} from './team';

enum Status {
    Accepted= 'Accepted',
    Rejected= 'Rejected',
    Pending= 'Pending',
    BeingJudged= 'BeingJudged',
    New= 'New',
}

export class Submission {
    constructor(
        public id: number,
        public team: Team,
        public time: string,
        public status: Status,
        public score: number
    ) {}
}
