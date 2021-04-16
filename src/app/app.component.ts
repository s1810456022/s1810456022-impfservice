import { Component, VERSION } from '@angular/core';
import { Vacevent } from './shared/vacevent';

@Component({
  selector: 'vac-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  listOn=true;
  detailsOn=false;

  vacevent: Vacevent;

  showList(){
    this.listOn = true;
    this.detailsOn = false;
  }

  showDetails(vacevent:Vacevent){
    this.vacevent = vacevent;
    this.listOn = false;
    this.detailsOn = true;
  }
}
