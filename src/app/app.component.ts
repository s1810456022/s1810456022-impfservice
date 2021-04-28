import { Component} from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';

@Component({
  selector: 'vac-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {


  constructor(private authService:AuthenticationService){}


  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    } else {
      return "Login";
    }
  }

  getAdminLabel(){
    console.log()
    if(localStorage.getItem("admin")=="1"){
      return "Impftermine verwalten";
    } else {
      return "Zur Impfung anmelden";
    }
  }
  
}
