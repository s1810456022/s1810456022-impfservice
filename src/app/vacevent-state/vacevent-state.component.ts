import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { Vacevent } from '../shared/vacevent';
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
  admin:boolean = false;
  vaclocationForm: FormGroup;
  vaclocation:Vaclocation[];
  selected:boolean = true;
  vaclocation_id_filtered:number = 0;


  constructor(private vac:VaceventService, private route:ActivatedRoute, private vacloc:VaclocationService, private fb:FormBuilder) { }


  ngOnInit() {
    if(localStorage.getItem("admin")=="1"){
      this.admin = true;
    }

    const params = this.route.snapshot.params;
    let state1 = params['state'];
    this.vac.getByState(state1).subscribe(res => this.vacevents = res);
    this.state = state1;

    this.vacloc.getLocationByState(state1).subscribe(vaclocation => {
        this.vaclocation = vaclocation;
        this.initVaclocationsSelect();
        console.log(this.vaclocation);
      });
    this.initVaclocationsSelect();
  }

  initVaclocationsSelect(){
    this.vaclocationForm = this.fb.group({
      vaclocations: this.vaclocation
    });
  }

  onChangeFilter(e: Event){
    let value = (<HTMLInputElement>e.target).value;
    console.log(value);
    if(value != "0")
      this.vaclocation_id_filtered = Number(value);
    else
      this.vaclocation_id_filtered = 0;
    
  }

}