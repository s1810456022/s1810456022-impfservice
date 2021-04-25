import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacevent } from '../shared/vacevent';
import { VaceventService } from '../shared/vacevent.service';
import { DatePipe} from '@angular/common';
import { VaclocationService } from '../shared/vaclocation.service';
import { Vaclocation } from '../shared/vaclocation';
import { VaceventFactory } from '../shared/vacevent-factory';
import { ToastrService} from "ngx-toastr";
import moment from 'moment';

@Component({
  selector: 'vac-vacevent-details-form',
  templateUrl: './vacevent-details-form.component.html'
})
export class VaceventDetailsFormComponent implements OnInit {
  @Input() vacevent:Vacevent;

  id:bigint;
  vaceventForm: FormGroup;
  isUpdatingVacevent = false;
  errors:{[key:string]:string} = {};
  datePipeStart: string;
  datePipeEnd: string;
  vaclocation: Vaclocation[];
  vaceventNew: Vacevent = VaceventFactory.empty();

  constructor(private fb:FormBuilder, private vac:VaceventService, private route:ActivatedRoute, private router:Router, private datePipe: DatePipe, private vacloc: VaclocationService, private toastr:ToastrService) {
   }

  ngOnInit() {
    
    const id = this.route.snapshot.params['id'];
    const state = this.route.snapshot.params['state'];
    console.log(id);
    if(id !== undefined){
      this.isUpdatingVacevent = true;
      this.vac.getSingle(id).subscribe(vacevent => {
        this.vacevent = vacevent;
        this.initVacevent(false);
      });
      this.vacloc.getLocationByState(state).subscribe(vaclocation => {
        this.vaclocation = vaclocation;
        this.initVacevent(false);
      });
    } else {
      this.vacloc.getLocationByState(state).subscribe(vaclocation => {
        this.vaclocation = vaclocation;
        this.initVacevent(true);
      });
    }
    
    this.initVacevent(true);
  }

  initVacevent(isNew:boolean){
    if(!isNew){
      this.datePipeStart = this.datePipe.transform(this.vacevent.startTime, 'HH:mm');
      this.datePipeEnd = this.datePipe.transform(this.vacevent.endTime, 'HH:mm');
  
      this.vaceventForm = this.fb.group({
          id: this.vacevent.id,
          vaclocation_id: this.vacevent.vaclocation_id,
          maxVac: this.vacevent.maxVac,
          date: this.vacevent.date,
          startTime: this.datePipeStart,
          endTime: this.datePipeEnd,

      });
    } else {
      this.datePipeStart = this.datePipe.transform(this.vaceventNew.startTime, 'HH:mm');
      this.datePipeEnd = this.datePipe.transform(this.vaceventNew.endTime, 'HH:mm');
  
      this.vaceventForm = this.fb.group({
          id: this.vaceventNew.id,
          vaclocation_id: this.vaceventNew.vaclocation_id,
          maxVac: this.vaceventNew.maxVac,
          date: this.vaceventNew.date,
          startTime: this.datePipeStart,
          endTime: this.datePipeEnd,

      });
    }
    
  }

  submitForm(){
    const updatedVacevent:Vacevent = VaceventFactory.fromObject(this.vaceventForm.value);

    const startTimeNew = moment(this.vaceventForm.value.date + ' ' + this.vaceventForm.value.startTime).toDate();
    const endTimeNew = moment(this.vaceventForm.value.date + ' ' + this.vaceventForm.value.endTime).toDate();
    updatedVacevent.startTime = startTimeNew; 
    updatedVacevent.endTime = endTimeNew; 
    this.vacloc.getLocationById(this.vaceventForm.value.vaclocation_id).subscribe(res  => {updatedVacevent.vaclocation = res;});

    if(this.isUpdatingVacevent)
      updatedVacevent.users = this.vacevent.users;
    else 
      updatedVacevent.users = [];
    
    if(this.isUpdatingVacevent){
      this.vac.update(updatedVacevent).subscribe(res => {
        this.toastr.success('Erfolgreich!', 'Impftermin erfolgreich geändert');
      }, (err)=>{
        //TODO sinvolle Fehlermeldung, von der Rest api auch fehlermessage schicken lassen
      });
    } else {
      this.vac.create(updatedVacevent).subscribe(res => {
        this.router.navigate(["../../"],{relativeTo:this.route});
      });
    }
  }

}