export class Explorer {
  userId: string;
  name: string;
  surname: string;
  xp: string;

  constructor(userId: string, data: ExplorerData) {
    this.userId = userId;
    this.name = data.name;
    this.surname = data.surname;
    this.xp = data.xp;
  }

  toData(): ExplorerData {
    return {
      name: this.name,
      surname: this.surname,
      xp: this.xp
    } as ExplorerData;
  }
}

export class ExplorerData {
  name: string;
  surname: string;
  xp: string;
}
