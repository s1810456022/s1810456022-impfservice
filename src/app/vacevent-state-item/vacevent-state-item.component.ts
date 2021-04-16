import { Component, Input, OnInit } from '@angular/core';
import { Vacevent } from '../shared/vacevent';

@Component({
  selector: 'li.vac-vacevent-state-item',
  templateUrl: './vacevent-state-item.component.html'
})
export class VaceventStateItemComponent implements OnInit {
  @Input() vacevent:Vacevent;

  constructor() { }

  ngOnInit() {
  }

}