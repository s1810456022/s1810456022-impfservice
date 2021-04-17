
import { User } from "./user";
import { Vaclocation } from "./vaclocation";

export class Vacevent {
  constructor(public id:number, 
  public date:Date, 
  public startTime:Date, 
  public endTime:Date, 
  public maxVac:number,
  public vaclocation_id: number,
  public vaclocation: Vaclocation,
  public userAmount: number,
  public users?:User[]) {}
}