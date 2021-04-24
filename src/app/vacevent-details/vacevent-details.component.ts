import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacevent } from '../shared/vacevent';
import { VaceventFactory } from '../shared/vacevent-factory';
import { VaceventService } from '../shared/vacevent.service';

@Component({
  selector: 'vac-vacevent-details',
  templateUrl: './vacevent-details.component.html'
})
export class VaceventDetailsComponent implements OnInit {
  vacevent:Vacevent = VaceventFactory.empty();
  id:bigint;

  isFormVisible: boolean = false;
  selectedStatus: boolean  = false;

  constructor(private vac:VaceventService, private route:ActivatedRoute, private router:Router) { }


  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.vac.getSingle(id).subscribe(res => this.vacevent = res);
  }

  removeVacevent(){ 
    
    if(confirm("Wollen Sie den Impftermin wirklich löschen?")){
      this.vac.remove(this.vacevent.id).subscribe(
          res => {
            this.router.navigate(['../../vaccinationevents/', this.vacevent.vaclocation.state], {relativeTo:this.route});
          }
      );
    }
  }

  onChange(e: Event){
    let value = (<HTMLInputElement>e.target).value;
    console.log(value);
  }

}