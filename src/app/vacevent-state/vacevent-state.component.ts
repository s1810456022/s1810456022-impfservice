import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VaccinationService } from '../shared/vaccination.service';
import { Vacevent } from '../shared/vacevent';

@Component({
  selector: 'vac-vacevent-state',
  templateUrl: './vacevent-state.component.html'
})
export class VaceventStateComponent implements OnInit {

  vacevents:Vacevent[];

  @Output() showDetailsEvent = new EventEmitter<Vacevent>();

  constructor(private vac:VaccinationService) { }

  ngOnInit() {
    this.vac.getByState(state:Text).subscribe(res => this.vacevents = res);
  }

}