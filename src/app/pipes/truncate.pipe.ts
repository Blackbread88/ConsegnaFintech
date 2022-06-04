import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(s: string, numChar: number=15): string {
    if (numChar<=0){numChar=1}
    if(s.length>numChar){
      return s.substring(0,numChar-1) + '...'
    }else{return s}
  }
}
