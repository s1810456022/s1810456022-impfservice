import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacevent } from '../shared/vacevent';
import { VaceventFactory } from '../shared/vacevent-factory';
import { VaceventService } from '../shared/vacevent.service';

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
  vaclocation = [
    {id:1,name: "Sporthalle D", address: "Huberweg 3", zipcode:"8200", city:"Linz"},
    {id:2,name: "Winterhütte ", address: "Huberweg 3", zipcode:"8200",city:"Graz"},
    {id:3,name: "Halle B", address: "Huberweg 3", zipcode:"8200",city:"Wien"}
  ];

  constructor(private fb:FormBuilder, private vac:VaceventService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    
    const id = this.route.snapshot.params['id'];
    if(id){
      this.vac.getSingle(id).subscribe(vacevent => {
        this.vacevent = vacevent;
        this.initVacevent();
      });
    }
  }

  initVacevent(){
    this.vaceventForm = this.fb.group({

    });
  }

  submitForm(){
    /*
    const updatedVacevent:Vacevent = VaceventFactory.fromObject(this.vaceventForm.value);
    console.log(updatedVacevent);

    if(this.isUpdatingVacevent){
      this.vac.update(updatedVacevent).subscribe(res => {
        this.router.navigate(["../../home"],{relativeTo:this.route});
      }, (err)=>{
        //TODO sinvolle Fehlermeldung, von der Rest api auch fehlermessage schicken lassen
      });
    } else {
      this.vacevent.create(updatedVacevent).subscribe(res => {
        this.router.navigate(["../home"],{relativeTo:this.route});
      });
    }*/
  }

}