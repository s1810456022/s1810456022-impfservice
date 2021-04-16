import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'impfs-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  listOn=true;
  detailsOn=false;

  book: Book;

  showList(){
    this.listOn = true;
    this.detailsOn = false;
  }

  showDetails(book:Book){
    this.book = book;
    this.listOn = false;
    this.detailsOn = true;
  }
}
