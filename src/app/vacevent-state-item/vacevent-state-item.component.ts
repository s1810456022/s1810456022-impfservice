import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { User } from '../shared/user';
import { UserFactory } from '../shared/user-factory';
import { UserService } from '../shared/user.service';
import { Vacevent } from '../shared/vacevent';
import { ToastrService} from "ngx-toastr";

@Component({
  selector: 'span.vac-vacevent-state-item',
  templateUrl: './vacevent-state-item.component.html'
})
export class VaceventStateItemComponent implements OnInit {
  @Input() vacevent:Vacevent;
  tooMuch:boolean = false;
  admin:boolean= false;
  user:User = UserFactory.empty();

  

  constructor(public authService:AuthenticationService, private use:UserService, private toastr:ToastrService) { }

  ngOnInit() {
    if(localStorage.getItem("admin")=="1"){
      this.admin = true;
    }

    if(this.vacevent.userAmount >= this.vacevent.maxVac){
      this.tooMuch = true;
    }
  }

  onClickBook(){
    console.log("hallo");
    let userId = localStorage.getItem("userId");
    console.log(userId);
    this.use.getUser(Number(userId)).subscribe(res=>{
        this.user = res;
        this.use.update(this.user).subscribe(res =>{
        this.toastr.success("Erflogreich!", 'Impfstatus erfolgreich gebucht');
      });
    });

  }

}