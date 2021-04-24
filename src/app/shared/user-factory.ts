import { User } from './user';
import { Vacevent } from './vacevent';
export class UserFactory {
 static empty(): User {
   return new User(null, '', '', false, '', new Date(), 0, 0, '', '', 0, '', false, '', '', 0);
 }
 static fromObject(rawUser: any): User {
   return new User(
     rawUser.id,
     rawUser.firstName,
     rawUser.lastName,
     rawUser.admin,
     rawUser.gender,
     typeof(rawUser.dateOfBirth) === 'string' ?
       new Date(rawUser.dateOfBirth) : rawUser.dateOfBirth,
     rawUser.svnr,
     rawUser.phoneNr,
     rawUser.street,
     rawUser.houseNumber,
     rawUser.postalCode,
     rawUser.city,
     rawUser.vacStatus,
     rawUser.email,
     rawUser.password,
     rawUser.vacevent_id,
   );
 }
}