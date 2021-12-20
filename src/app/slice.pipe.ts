import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice'
})
export class SlicePipe implements PipeTransform {
  //Slicing Data
  transform(value: any, size:number,page:number): any {
    console.log(value)
    if(page==1)
    return value.splice(0,size);
    else
    return value.splice((page-1)*size,page*size);
  }

}
