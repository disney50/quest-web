export class Explorer {
  userId: string;
  name: string;
  surname: string;
  xp: string;
  moderatingQuests: number;

  constructor(userId: string, data: ExplorerData) {
    this.userId = userId;
    this.name = data.name;
    this.surname = data.surname;
    this.xp = data.xp;
    this.moderatingQuests = data.moderatingQuests;
  }

  toData(): ExplorerData {
    return {
      userId: this.userId,
      name: this.name,
      surname: this.surname,
      xp: this.xp,
      moderatingQuests: this.moderatingQuests
    } as ExplorerData;
  }
}

export class ExplorerData {
  name: string;
  surname: string;
  xp: string;
  moderatingQuests: number;
}
