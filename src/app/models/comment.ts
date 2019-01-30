import { Timestamp } from '@firebase/firestore-types';

export class Comment {
    comment: string;
    isModerator: boolean;
    timestamp: Timestamp;

    constructor(data: CommentData) {
        this.comment = data.comment;
        this.isModerator = data.isModerator;
        this.timestamp = data.timestamp;
    }

    toData(): CommentData {
        return {
            comment: this.comment,
            isModerator: this.isModerator,
            timestamp: this.timestamp
        } as CommentData;
    }
}

export class CommentData {
    comment: string;
    isModerator: boolean;
    timestamp: Timestamp;
}