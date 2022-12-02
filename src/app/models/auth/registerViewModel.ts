export class registerViewModel{
  public compId: number;
  public status : number;
  public username : string;
  public password : string;
  public passwordConfirmation : string;
  public unitId : number;
  public fullName : string;
  public email : string;
  public PhoneNumber : string;
  public roleIds : string[];

  constructor( _compId: number,  _status : number,
     _username : string,
     _password : string,
     _passwordConfirmation : string,
     _unitId : number,
     _fullName : string,
     _email : string,
     _PhoneNumber : string,
     _roleIds : string[])
    {
      this.compId = _compId;
      this.status = _status;
      this.username = _username;
      this.password = _password;
      this.passwordConfirmation = _passwordConfirmation;
      this.unitId = _unitId;
      this.fullName = _fullName;
      this.email = _email;
      this.PhoneNumber = _PhoneNumber;
      this.roleIds = _roleIds;
    }
}
