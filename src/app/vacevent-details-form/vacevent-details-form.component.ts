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
  selected:false;

  constructor(private fb:FormBuilder, private vac:VaceventService, private route:ActivatedRoute, private router:Router, private datePipe: DatePipe, private vacloc: VaclocationService, private toastr:ToastrService) {
   }

  ngOnInit() {
    
    const id = this.route.snapshot.params['id'];
    if(id){
      this.isUpdatingVacevent = true;
      this.vac.getSingle(id).subscribe(vacevent => {
        this.vacevent = vacevent;
        this.initVacevent();
      });

      console.log(this.vacevent.vaclocation.state);

      this.vacloc.getLocationByState(this.vacevent.vaclocation.state).subscribe(vaclocation => {
        this.vaclocation = vaclocation;
        this.initVacevent(this.vacevent.vaclocation.id);
        for(let vacloc of this.vaclocation){
      console.log(vacloc);
    }
      });
    }
    this.initVacevent();
  }

  initVacevent(){
    this.datePipeStart = this.datePipe.transform(this.vacevent.startTime, 'HH:mm');
    this.datePipeEnd = this.datePipe.transform(this.vacevent.endTime, 'HH:mm');
    console.log(this.vacevent.vaclocation.name);
    this.vaceventForm = this.fb.group({
        id: this.vacevent.id,
        vaclocation: this.vacevent.vaclocation.name,
        maxVac: this.vacevent.maxVac,
        date: this.vacevent.date,
        startTime: this.datePipeStart,
        endTime: this.datePipeEnd,

    });
  }

  submitForm(){
    const updatedVacevent:Vacevent = VaceventFactory.fromObject(this.vaceventForm.value);
    console.log(updatedVacevent);

    if(this.isUpdatingVacevent){
      this.vac.update(updatedVacevent).subscribe(res => {
        this.toastr.success('Erfolgreich!', 'Impftermin erfolgreich geändert');
      }, (err)=>{
        //TODO sinvolle Fehlermeldung, von der Rest api auch fehlermessage schicken lassen
      });
    } else {
      this.vac.create(updatedVacevent).subscribe(res => {
        this.router.navigate(["../home"],{relativeTo:this.route});
      });
    }
  }

}