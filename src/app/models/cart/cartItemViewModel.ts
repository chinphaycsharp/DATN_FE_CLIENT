export class cartItemViewModel{
  public id:number;
  public name:string;
  public price:any;
  public amount : number = 1;
  public priceOnTotal : any;
  public title : string

  constructor(_id:number,_name:string, _price:any,_amount : number, _priceOnTotal : any,_title:string){
    this.id = _id;
    this.name = _name;
    this.price = _price;
    this.amount = _amount;
    this.priceOnTotal = _priceOnTotal;
    this.title = _title;
  }
}
