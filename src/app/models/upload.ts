import { Timestamp } from '@firebase/firestore-types';
import { SafeResourceUrl } from '@angular/platform-browser';

export class Upload {
    name: string;
    timestamp: Timestamp;
    link: SafeResourceUrl;
}
