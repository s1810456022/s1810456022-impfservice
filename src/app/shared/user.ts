export class User {
  constructor(public id:number, 
  public firstName:string,
  public lastName:string,
  public admin:boolean,
  public gender:string,
  public dateOfBirth:Date, 
  public svnr:number,
  public phoneNr:number,
  public street:string,
  public houseNumber:string,
  public postalCode:number,
  public city:string,
  public vacStatus:boolean,
  public email:string,
  public password:string,
  public vacevent_id?:number) {}
}