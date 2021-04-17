
import { Vacevent } from './vacevent';
export class VaceventFactory {
 static empty(): Vacevent {
   return new Vacevent(null,new Date(),new Date(),new Date(), 0, 0, {id: 0, name: '', street: '', houseNumber: '', postalCode: 0, city: '', state: '' }, 0, [{id: 0, firstName: '', lastName: '', admin: false, gender: '', dateOfBirth: new Date(), svnr: 0, phoneNr: 0, street: '', houseNumber: '', postalCode: 0, city: '', vacStatus: false, email: '', password: '', vacevent_id: 0}]);
 }
 static fromObject(rawVacevent: any): Vacevent {
   return new Vacevent(
     rawVacevent.id,
     typeof(rawVacevent.date) === 'string' ?
       new Date(rawVacevent.date) : rawVacevent.date,
     typeof(rawVacevent.startTime) === 'string' ?
       new Date(rawVacevent.startTime) : rawVacevent.startTime,
     typeof(rawVacevent.endTime) === 'string' ?
       new Date(rawVacevent.endTime) : rawVacevent.endTime,
     rawVacevent.maxVac,
     rawVacevent.vaclocation_id,
     rawVacevent.vaclocation,
     rawVacevent.userAmount,
     rawVacevent.users,
   );
 }
}