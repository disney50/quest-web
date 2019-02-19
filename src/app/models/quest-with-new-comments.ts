import { Level2 } from './level2';
import { Level1 } from './level1';
import { Timestamp } from '@firebase/firestore-types';

export class QuestWithNewComments {
  title: string;
  description: string;
  max_xp: string;
  order: number;
  prerequisites: string[];
  level1: Level1 = {} as Level1;
  level2: Level2 = {} as Level2;
  status: string;
  questId: string;
  isAvailable = false;
  comment_last_view_date: Timestamp;
  newComments: number;
}
