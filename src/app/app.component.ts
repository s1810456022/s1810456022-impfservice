import { Component, VERSION } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';
import { Vacevent } from './shared/vacevent';
import { VaceventFactory } from './shared/vacevent-factory';
import { VaceventService } from './shared/vacevent.service';

@Component({
  selector: 'vac-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  admin:boolean = false;
  firstName:string = "";
  lastName:string = "";
  vacStatus:string = "";
  vacevent_date:Date = new Date();
  vacevent_startTime:Date = new Date();
  vacevent_endTime:Date = new Date();
  vacevent_location:string = "";
  vacevent:Vacevent = VaceventFactory.empty();
  booked:boolean = false;


  constructor(private authService:AuthenticationService, private vac:VaceventService){}

  ngOnInit() {

    if(this.isLoggedIn()){
      this.firstName = localStorage.getItem("firstName");
      this.lastName = localStorage.getItem("lastName");
      if(localStorage.getItem("vacStatus") == "0"){
        this.vacStatus = "nicht geimpft";
      }
      if(localStorage.getItem("vacevent_event_id") != "0"){
        this.booked = true;
        this.vac.getSingle(Number(localStorage.getItem("vacevent_id"))).subscribe(vacevent => {
          this.vacevent = vacevent;
          this.vacevent_date = this.vacevent.date;
          this.vacevent_startTime = this.vacevent.startTime;
          this.vacevent_endTime = this.vacevent.endTime;
          console.log(this.vacevent.vaclocation.name);
          this.vacevent_location = this.vacevent.vaclocation.name;
        });
      }
      
    }
    
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    } else {
      return "Login";
    }
  }

  getAdminLabel(){
    console.log()
    if(localStorage.getItem("admin")=="1"){
      return "Impftermine verwalten";
    } else {
      return "Zur Impfung anmelden";
    }
  }
  
}
