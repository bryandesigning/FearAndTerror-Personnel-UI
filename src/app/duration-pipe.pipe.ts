import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationPipe'
})
export class DurationPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const inputSeconds = parseInt(value, 0);
    const hours = Math.floor(inputSeconds / 3600);
    const minutes = Math.floor((inputSeconds - (hours * 3600)) / 60);
    const seconds = inputSeconds - (hours * 3600) - (minutes * 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

}
