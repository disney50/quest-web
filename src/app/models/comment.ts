import { FieldValue } from '@firebase/firestore-types';

export class Comment {
    commentId: string;
    comment: string;
    isModerator: boolean;
    timestamp: FieldValue;

    constructor(commentId: string, data: CommentData) {
        this.commentId = commentId;;
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
    timestamp: FieldValue;
}