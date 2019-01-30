export class User {
  gender: string;
  name: string;
  surname: string;
  userId: string;
  email: string;
  password: string;

  constructor(userId: string, data: UserData) {
    this.gender = data.gender;
    this.name = data.name;
    this.surname = data.surname;
    this.userId = userId;
    this.email = data.email;
    this.password = data.password;
  }

  toData(): UserData {
    return {
      gender: this.gender,
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password
    } as UserData;
  }
}

export class UserData {
  gender: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}
