import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Contact[], textToSearch: string) {
    if (textToSearch === '') {
      return items;
    }
    return items.filter(item => {
      return item.name.toLowerCase().includes(textToSearch.toLowerCase())||item.surname.toLowerCase().includes(textToSearch.toLowerCase());
    });
  }
}
