export class ChangePasswordDto{
  public  OldPassword :string;
  public  NewPassword :string;
  public  NewPasswordConfirm :string;

  constructor(_oldPassword:string, _newPassword:string, _NewPasswordConfirm:string){
    this.OldPassword = _oldPassword;
    this.NewPassword = _newPassword;
    this.NewPasswordConfirm = _NewPasswordConfirm;
  }
}
