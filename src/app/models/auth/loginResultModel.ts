export class loginResultModel{
  public access_token:string;
  public refresh_token:string;
  public fullName:string;
  public username:string;
  public expires:string;
  public now : string;
  public privileges : Privilege[];
}

interface Privilege{
  name:string;
}
