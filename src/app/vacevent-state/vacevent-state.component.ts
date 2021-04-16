import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VaccinationService } from '../shared/vaccination.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacevent } from '../shared/vacevent';

@Component({
  selector: 'vac-vacevent-state',
  templateUrl: './vacevent-state.component.html'
})
export class VaceventStateComponent implements OnInit {

  vacevents:Vacevent[];

  @Output() showDetailsEvent = new EventEmitter<Vacevent>();

  constructor(private vac:VaccinationService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.vac.getByState(params['state']).subscribe(res => this.vacevents = res);
  }

}