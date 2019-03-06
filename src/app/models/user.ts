export class User {
  constructor(
    public userId?: number,
    public name?: string,
    public secondName?: string,
    public login?: string,
    public password?: string,
    public passwordHash?: string,
    public token?: string
  ) {}
}
