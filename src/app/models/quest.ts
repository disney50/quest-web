import { Level2 } from "./level2";
import { Level1 } from "./level1";

export class Quest {
  title: string;
  description: string;
  max_xp: string;
  order: number;
  prerequisites: string[];
  level1: Level1;
  level2: Level2;
  status: string;
  questId: string;

  constructor(questId: string, data: QuestData) {
    this.questId = questId;
    this.title = data.title;
    this.description = data.description;
    this.max_xp = data.max_xp;
    this.order = data.order;
    this.prerequisites = data.prerequisites;
    this.level1 = data.level1;
    this.level2 = data.level2;
    this.status = data.status;
  }

  toData(): QuestData {
    return {
      title: this.title,
      description: this.description,
      max_xp: this.max_xp,
      order: this.order,
      prerequisites: this.prerequisites,
      level1: this.level1,
      level2: this.level2,
      status: this.status
    } as QuestData;
  }
}

export class QuestData {
  title: string;
  description: string;
  max_xp: string;
  order: number;
  prerequisites: string[];
  level1: Level1;
  level2: Level2;
  status: string;
}