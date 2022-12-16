export class UpdateInformationViewModel{
  public  Id :number;
  public  fullName :string;
  public  UnitId :number;
  public  email :string;
  public  phoneNumber :string;
  public  roleIds : string[];
  public  Address : string;

  constructor( _Id: number,  _fullName : string,
    _UnitId : number,
    _email : string,
    _PhoneNumber : string,
    _roleIds : string[],
    _Address:string)
   {
    this.Id = _Id;
    this.fullName = _fullName;
     this.UnitId = _UnitId;
     this.email = _email;
     this.phoneNumber = _PhoneNumber;
     this.roleIds = _roleIds;
     this.Address = _Address;
   }
}
