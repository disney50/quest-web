export class Explorer {
  userId: string;
  name: string;
  surname: string;
  xp: string;
  moderatingQuests: number;
  newComments: number;

  constructor(userId: string, data: ExplorerData) {
    this.userId = userId;
    this.name = data.name;
    this.surname = data.surname;
    this.xp = data.xp;
    this.moderatingQuests = data.moderatingQuests;
    this.newComments = data.newComments;
  }

  toData(): ExplorerData {
    return {
      userId: this.userId,
      name: this.name,
      surname: this.surname,
      xp: this.xp,
      moderatingQuests: this.moderatingQuests,
      newComments: this.newComments
    } as ExplorerData;
  }
}

export class ExplorerData {
  name: string;
  surname: string;
  xp: string;
  moderatingQuests: number;
  newComments: number;
}
