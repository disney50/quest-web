export class Explorer {
    name: string;
    surname: string;
    xp: string;

    constructor(data: ExplorerData) {
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