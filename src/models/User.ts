export class User {
  id?: string;
  name?: number;

  constructor(data?: User) {
    if (!data) return;
    this.init(data);
  }

  init(data?: User) {
    if (!data) return;
    this.id = data.id;
    this.name = data.name;
  }
}
