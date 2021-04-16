import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacevent } from '../shared/vacevent';
import { VaceventService } from '../shared/vacevent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  vacevents:Vacevent[];

  constructor(private vac:VaceventService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.vac.getByState(params['state']).subscribe(res => this.vacevents = res);
  }

}