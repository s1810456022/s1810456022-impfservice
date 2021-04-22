import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacevent } from '../shared/vacevent';
import { VaceventService } from '../shared/vacevent.service';

@Component({
  selector: 'vac-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  admin:boolean = false;

  constructor() { }

  ngOnInit() {
    
  }

}