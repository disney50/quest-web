export class Quest {
  title: string;
  description: string;
  status: string;
  questId: string;

  constructor(questId: string, data: QuestData) {
    this.questId = questId;
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
  }

  toData(): QuestData {
    return {
      title: this.title,
      description: this.description,
      status: this.status
    } as QuestData;
  }
}

export class QuestData {
  title: string;
  description: string;
  status: string;
}