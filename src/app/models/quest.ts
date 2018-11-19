export class Quest {
  title: string;
  description: string;
  max_xp: string;
  order: number;
  prerequisites: [];
  // level1:
  // level2:
  status: string;
  questId: string;

  constructor(questId: string, data: QuestData) {
    this.questId = questId;
    this.title = data.title;
    this.description = data.description;
    this.max_xp = data.max_xp;
    this.order = data.order;
    this.prerequisites = data.prerequisites;
    // level1:
    // level2:
    this.status = data.status;
  }

  toData(): QuestData {
    return {
      title: this.title,
      description: this.description,
      max_xp: this.max_xp,
      order: this.order,
      prerequisites: this.prerequisites,
      // level1:
      // level2:
      status: this.status
    } as QuestData;
  }
}

export class QuestData {
  title: string;
  description: string;
  max_xp: string;
  order: number;
  prerequisites: [];
  // level1:
  // level2:
  status: string;
}