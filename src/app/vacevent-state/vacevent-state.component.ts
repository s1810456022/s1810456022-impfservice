import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { Vacevent } from '../shared/vacevent';
import { VaceventFactory } from '../shared/vacevent-factory';
import { VaceventService } from '../shared/vacevent.service';
import { Vaclocation } from '../shared/vaclocation';
import { VaclocationService } from '../shared/vaclocation.service';

@Component({
  selector: 'vac-vacevent-state',
  templateUrl: './vacevent-state.component.html'
})
export class VaceventStateComponent implements OnInit {

  vacevents:Vacevent[];
  state:string = "";
  admin:string = "0";
  firstName:string = "";
  lastName:string = "";
  vacevent_date:Date = new Date();
  vacevent_startTime:Date = new Date();
  vacevent_endTime:Date = new Date();
  vacevent_location:string = "";
  vacevent_location_state:string = "";
  vacevent:Vacevent = VaceventFactory.empty();
  vaclocationForm: FormGroup;
  vaclocation:Vaclocation[];
  selected:boolean = true;
  vaclocation_id_filtered:number = 0;


  constructor(private vac:VaceventService, private route:ActivatedRoute, private vacloc:VaclocationService, private fb:FormBuilder, private authService:AuthenticationService) { }


  ngOnInit() {
    if(localStorage.getItem("admin")=="1"){
      this.admin = "1";
    }
    this.getReservationInfo();
    const params = this.route.snapshot.params;
    let state1 = params['state'];
    this.vac.getByState(state1).subscribe(res => this.vacevents = res);
    this.state = state1;

    this.vacloc.getLocationByState(state1).subscribe(vaclocation => {
        this.vaclocation = vaclocation;
        this.initVaclocationsSelect();
      });
    this.initVaclocationsSelect();
  }

  initVaclocationsSelect(){
    this.vaclocationForm = this.fb.group({
      vaclocations: this.vaclocation
    });
  }

  getReservationInfo(){
    if(this.isLoggedIn() && localStorage.getItem("admin")!="1"){
      this.firstName = localStorage.getItem("firstName");
      this.lastName = localStorage.getItem("lastName");
      
      if(localStorage.getItem("vacevent_id") != "0"){
        this.vac.getSingle(Number(localStorage.getItem("vacevent_id"))).subscribe(vacevent => {
          this.vacevent = vacevent;
          this.vacevent_date = this.vacevent.date;
          this.vacevent_startTime = this.vacevent.startTime;
          this.vacevent_endTime = this.vacevent.endTime;
          this.vacevent_location = this.vacevent.vaclocation.name;
          this.vacevent_location_state = this.vacevent.vaclocation.state;
        });
      }
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  onChangeFilter(e: Event){
    let value = (<HTMLInputElement>e.target).value;
    if(value != "0")
      this.vaclocation_id_filtered = Number(value);
    else
      this.vaclocation_id_filtered = 0;
    
  }

}