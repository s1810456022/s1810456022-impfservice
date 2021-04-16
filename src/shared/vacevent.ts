import { Time } from "@angular/common";

export class Vacevent {
  constructor(public id:number, 
  public date:Date, 
  public startTime:Time, 
  public endTime:Time, 
  public maxVac:number, 
  public published:Date, 
  public vaclocation_id:number) {}
}