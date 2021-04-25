import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  admin:boolean = true;
  vaclocationForm: FormGroup;
  vaclocation:Vaclocation[];
  selected:boolean = true;


  constructor(private vac:VaceventService, private route:ActivatedRoute, private router:Router, private vacloc:VaclocationService, private fb:FormBuilder) { }


  ngOnInit() {
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

  onChange(e: Event){
    let value = (<HTMLInputElement>e.target).value;
    console.log(value);
    
  }

}