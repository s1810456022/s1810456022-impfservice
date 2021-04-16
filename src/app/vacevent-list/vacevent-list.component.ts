import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Vacevent } from '../shared/vacevent';
import { VaceventFactory } from '../shared/vacevent-factory';
import { VaceventService } from '../shared/vacevent.service';

@Component({
  selector: 'vac-vacevent-list',
  templateUrl: './vacevent-list.component.html'
})
export class VaceventListComponent implements OnInit {

  vacevents:Vacevent[];
  

  @Output() showDetailsEvent = new EventEmitter<Vacevent>();

  constructor(private vac:VaceventService) { }

  ngOnInit() {
    this.vac.getAll().subscribe(res => this.vacevents = res);
  }

}