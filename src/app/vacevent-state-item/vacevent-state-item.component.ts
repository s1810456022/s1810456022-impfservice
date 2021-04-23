import { Component, Input, OnInit } from '@angular/core';
import { Vacevent } from '../shared/vacevent';

@Component({
  selector: 'span.vac-vacevent-state-item',
  templateUrl: './vacevent-state-item.component.html'
})
export class VaceventStateItemComponent implements OnInit {
  @Input() vacevent:Vacevent;
  tooMuch:boolean = false;
  
  admin:boolean = true;

  

  constructor() { }

  ngOnInit() {
    if(this.vacevent.userAmount >= this.vacevent.maxVac){
      this.tooMuch = true;
    }
  }

}