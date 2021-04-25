import { User } from './user';
import { Vaclocation } from './vaclocation';
export class VaclocationFactory {
 static empty(): Vaclocation {
   return new Vaclocation(null, '', '', '', 0, '', '');
 }
 static fromObject(rawVaclocation: any): Vaclocation {
   return new Vaclocation(
     rawVaclocation.id,
     rawVaclocation.name,
     rawVaclocation.street,
     rawVaclocation.houseNumber,
     rawVaclocation.postalCode,
     rawVaclocation.city,
     rawVaclocation.state,
   );
 }
}