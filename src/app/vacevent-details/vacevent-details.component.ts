import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/user';
import { UserFactory } from '../shared/user-factory';
import { UserService } from '../shared/user.service';
import { Vacevent } from '../shared/vacevent';
import { VaceventFactory } from '../shared/vacevent-factory';
import { VaceventService } from '../shared/vacevent.service';
import { ToastrService} from "ngx-toastr";

@Component({
  selector: 'vac-vacevent-details',
  templateUrl: './vacevent-details.component.html'
})
export class VaceventDetailsComponent implements OnInit {
  vacevent:Vacevent = VaceventFactory.empty();
  id:bigint;
  userForm: FormGroup;
  user:User = UserFactory.empty();
  isFormVisible: boolean = false;
  dateToday:Date = new Date();
  isDateinPast:boolean = false;

  
  constructor(private fb:FormBuilder, private vac:VaceventService, private route:ActivatedRoute, private router:Router, private use:UserService, private toastr:ToastrService) { }


  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.vac.getSingle(id).subscribe(vacevent => {
      this.vacevent = vacevent;
      if(this.vacevent.date > this.dateToday)
        this.isDateinPast = true;
      console.log(this.vacevent.date);
      console.log(this.dateToday);
    });
    this.userForm = this.fb.group({
      vacStatus: this.user.vacStatus
    });
  }

  removeVacevent(){ 
    
    if(confirm("Wollen Sie den Impftermin wirklich löschen?")){
      this.vac.remove(this.vacevent.id).subscribe(
          res => {
            this.router.navigate(['../'], {relativeTo:this.route});
          }
      );
    }
  }

  onChangeEdit(e: Event, user){
    let value = (<HTMLInputElement>e.target).value;
    console.log(user);
    this.user = user;
    this.user.vacStatus = Boolean(JSON.parse(value));;
    this.use.update(this.user).subscribe(res =>{
      this.toastr.success(this.user.lastName, 'Impfstatus erfolgreich geändert');
    });
  }

}