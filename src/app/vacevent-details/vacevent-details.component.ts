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
  @Output() vacevent:Vacevent = VaceventFactory.empty();
  id:bigint;
  visible:boolean=false;
  @Output() showEditEvent = new EventEmitter<boolean>();

  constructor(private vac:VaceventService, private route:ActivatedRoute, private router:Router) { }

  showEdit(visible:boolean){
    console.log(this.visible);
    this.showEditEvent.emit(visible);
  }

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

}