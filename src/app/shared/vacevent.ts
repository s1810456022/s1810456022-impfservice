import { DatePipe} from "@angular/common";
import { User } from "./user";

export class Vacevent {
  constructor(public id:number, 
  public date:Date, 
  public startTime:DatePipe, 
  public endTime:DatePipe, 
  public maxVac:number,
  public vaclocation_id:number,
  public users?:User[]) {}
}