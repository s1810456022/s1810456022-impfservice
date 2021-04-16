import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VaccinationService } from '../shared/vaccination.service';
import { Vacevent } from '../shared/vacevent';

@Component({
  selector: 'vac-vacevent-list',
  templateUrl: './vacevent-list.component.html'
})
export class VaceventListComponent implements OnInit {

  vacevents:Vacevent[];

  @Output() showDetailsEvent = new EventEmitter<Vacevent>();

  constructor(private vac:VaccinationService) { }

  ngOnInit() {
    this.vac.getAll().subscribe(res => this.vacevents = res);
  }

}