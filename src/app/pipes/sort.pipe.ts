import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const sortType = args[0];
    const sortKey = args[1];
    if(value.length === 0) {
      return value;
    }
    const newVal = value.sort((a: any, b: any): number => {
      if (a[sortKey].toLowerCase() < b[sortKey].toLowerCase() && sortType === 'asc') {
        return -1;
      }
      if (a[sortKey].toLowerCase() > b[sortKey].toLowerCase() && sortType === 'asc') {
          return 1;
      }
      if (a[sortKey].toLowerCase() < b[sortKey].toLowerCase() && sortType === 'desc') {
          return 1;
      }
      if (a[sortKey].toLowerCase() > b[sortKey].toLowerCase() && sortType === 'desc') {
          return -1;
      }
      return 0;
    })
    return newVal;
  }
}
