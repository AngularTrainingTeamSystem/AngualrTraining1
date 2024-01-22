import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name:'filter',
  pure: true
})
export class FilterPipe implements PipeTransform{
  transform(value: any, name: string) {
    if(name === ''){
      return value;
    }
    return value.filter((contact: { name: string; }) => contact.name.startsWith(name));
  }
}
