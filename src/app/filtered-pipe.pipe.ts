import { Pipe, PipeTransform } from '@angular/core';
import { Kontakt } from './kontakt';

@Pipe({
  name: 'filteredPipe'
})
export class FilteredPipePipe implements PipeTransform {

  transform(value: Kontakt[], search: string): Kontakt[] {
    
    console.log(search);
    if ( typeof search==='undefined') {
      
      return value;
    }else{
      
    return value.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  }

}}
