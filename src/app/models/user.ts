export class User {
  firebaseUserId: string;
  gender: string;
  name: string;
  surname: string;
  userId: string;

  constructor(userId: string, data: UserData) {
    this.firebaseUserId = data.firebaseUserId;
    this.gender = data.gender;
    this.name = data.name;
    this.surname = data.surname;
    this.userId = userId;
  }

  toData(): UserData {
    return {
      firebaseUserId: this.firebaseUserId,
      gender: this.gender,
      name: this.name,
      surname: this.surname,
    } as UserData;
  } 
}

export class UserData {
  firebaseUserId: string;
  gender: string;
  name: string;
  surname: string;
}