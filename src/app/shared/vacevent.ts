
import { User } from "./user";

export class Vacevent {
  constructor(public id:number, 
  public date:Date, 
  public startTime:Date, 
  public endTime:Date, 
  public maxVac:number,
  public vaclocation_id:number,
  public users?:User[]) {}
}