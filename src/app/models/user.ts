export class User {
  firebaseUserId: string;
  gender: string;
  name: string;
  surname: string;
  userId: string;
  email: string;
  password: string;

  constructor(userId: string, data: UserData) {
    this.firebaseUserId = data.firebaseUserId;
    this.gender = data.gender;
    this.name = data.name;
    this.surname = data.surname;
    this.userId = userId;
    this.email = data.email; 
    this.password = data.password
  }

  toData(): UserData {
    return {
      firebaseUserId: this.firebaseUserId,
      gender: this.gender,
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.email
    } as UserData;
  } 
}

export class UserData {
  firebaseUserId: string;
  gender: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}