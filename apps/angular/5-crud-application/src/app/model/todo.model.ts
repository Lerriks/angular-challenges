export class Todo {
  constructor(
    public userID: number,
    public id: number,
    public title: string,
    public completed = false,
  ) {}
}
