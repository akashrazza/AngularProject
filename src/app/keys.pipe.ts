import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  //Getting data into keys value format
  transform(value:any, size:number,page:number): any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    if(page==1)
    return keys.splice(0,size);
    else
    return keys.splice((page-1)*size,page*size);
  }

}
