import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacevent } from '../shared/vacevent';
import { VaceventService } from '../shared/vacevent.service';

@Component({
  selector: 'vac-vacevent-state',
  templateUrl: './vacevent-state.component.html'
})
export class VaceventStateComponent implements OnInit {

  vacevents:Vacevent[];

  @Output() showDetailsEvent = new EventEmitter<Vacevent>();

  constructor(private vac:VaceventService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    console.log(this.vac.getByState(params['state']).subscribe(res => this.vacevents = res));
  }

}