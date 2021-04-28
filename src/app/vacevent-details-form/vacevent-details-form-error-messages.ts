export class ErrorMessage {
 constructor(
   public forControl: string,
   public forValidator: string,
   public text: string
 ) { }
}
export const VaceventDetailsFormErrorMessages = [
  new ErrorMessage('vaclocation_id', 'required', 'Es muss ein Standort für die Impfung angegeben werden.'),
 new ErrorMessage('maxVac', 'required', 'Es muss eine Teilnehmer*innananzahl angegeben werden.'),
 new ErrorMessage('maxVac', 'min', 'Es muss mindestens ein*e Teilnehmer*in geimpft werden können.'),
 new ErrorMessage('date', 'required', 'Es muss ein Datum angegeben werden.'),
 new ErrorMessage('startTime', 'required', 'Es muss eine Startzeit angegeben werden.'),
 new ErrorMessage('endTime', 'required', 'Es muss eine Endzeit angegeben werden.')
];