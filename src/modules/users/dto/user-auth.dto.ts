export class UserAuthDto {
  password: string;
  email: string;
}

export class UserAuthResultDto {
  username: string;
  email: string;
  token: string;
}
