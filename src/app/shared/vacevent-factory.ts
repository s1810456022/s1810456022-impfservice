import { DatePipe } from '@angular/common';
import { Vacevent } from './vacevent';
export class VaceventFactory {
 static empty(): Vacevent {
   return new Vacevent(null,new Date(),new DatePipe(''),new DatePipe(''), 0, 0, [{id: 0, firstName: '', lastName: '', admin: false, gender: '', dateOfBirth: new Date(), svnr: 0, phoneNr: 0, street: '', houseNumber: '', postalCode: 0, city: '', vacStatus: false, email: '', password: '', vacevent_id: 0}]);
 }
 static fromObject(rawVacevent: any): Vacevent {
   return new Vacevent(
     rawVacevent.id,
     typeof(rawVacevent.date) === 'string' ?
       new Date(rawVacevent.date) : rawVacevent.date,
     typeof(rawVacevent.startTime) === 'string' ?
       new DatePipe(rawVacevent.startTime) : rawVacevent.startTime,
     typeof(rawVacevent.endTime) === 'string' ?
       new DatePipe(rawVacevent.endTime) : rawVacevent.endTime,
     rawVacevent.maxVac,
     rawVacevent.vaclocation_id,
     rawVacevent.users,
   );
 }
}