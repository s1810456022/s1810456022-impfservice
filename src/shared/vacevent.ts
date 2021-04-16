import { Time } from "@angular/common";
import { User } from "./user";

export class Vacevent {
  constructor(public id:number, 
  public date:Date, 
  public startTime:Time, 
  public endTime:Time, 
  public maxVac:number,
  public vaclocation_id:number,
  public users?:User[]) {}
}