import { Component, OnInit, Output } from '@angular/core';
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

  constructor(private vac:VaceventService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.vac.getSingle(params['id']).subscribe(res => this.vacevent = res);
    console.log(this.vacevent);
  }

  removeVacevent(){
    
    if(confirm("Wollen Sie den Impftermin wirklich löschen?")){
      this.vac.remove(this.vacevent.id).subscribe(
          res => {
            this.router.navigate(['../../'], {relativeTo:this.route});
          }
      );
    }
  }

}