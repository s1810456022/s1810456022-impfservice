import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Vacevent } from '../shared/vacevent';

@Component({
  selector: 'span.vac-vacevent-state-item',
  templateUrl: './vacevent-state-item.component.html'
})
export class VaceventStateItemComponent implements OnInit {
  @Input() vacevent:Vacevent;
  tooMuch:boolean = false;
  
  admin:boolean= false;

  

  constructor(public authService:AuthenticationService) { }

  ngOnInit() {
    if(localStorage.getItem("admin")=="1"){
      this.admin = true;
    }

    if(this.vacevent.userAmount >= this.vacevent.maxVac){
      this.tooMuch = true;
    }
  }

}