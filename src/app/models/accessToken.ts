export class AccessToken {
  constructor(public unique_name?: number,
              public exp?: number,
              public iat?: number,
              public nbf?: number,
              public role?: string) {}

}
