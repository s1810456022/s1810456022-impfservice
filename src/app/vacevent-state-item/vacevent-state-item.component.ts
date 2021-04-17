import { Component, Input, OnInit } from '@angular/core';
import { Vacevent } from '../shared/vacevent';

@Component({
  selector: 'span.vac-vacevent-state-item',
  templateUrl: './vacevent-state-item.component.html'
})
export class VaceventStateItemComponent implements OnInit {
  @Input() vacevent:Vacevent;

  constructor() { }

  ngOnInit() {
    console.log(this.vacevent.vaclocation_id);
    console.log(this.vacevent.users);
  }

}