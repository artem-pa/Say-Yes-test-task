import { Component, OnInit } from '@angular/core';
import { CITY_LIST, DAY_LIST } from '../../constant/constatn';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  days = DAY_LIST.ru;
  cities = CITY_LIST;
  minutes = [0, 15, 30, 45];
  times = this.createTimeList();

  bannerName = 'Banner1';

  dateStart: string;
  dateEnd: string;

  timeStart = '10:00';
  timeEnd = '21:00';

  ngOnInit(): void {
  }

  createTimeList(): string[] {
    const arr: string[] = [];
    for (let h = 0; h < 24; h++) {
      const hours = this.zeroPrefix(h);
      this.minutes.forEach(m => arr.push(`${hours}:${this.zeroPrefix(m)}`))
    }
    return arr;
  }

  zeroPrefix(num: number): string {
    const numString = num.toFixed();
    return numString.length > 1 ? numString : `0${numString}`;
  }

  updateDateStart(date: string) {
    this.dateStart = date;
  }
  updateDateEnd(date: string) {
    this.dateEnd = date;
  }
  updateTimeStart(time: string) {
    this.timeStart = time;
  }
  updateTimeEnd(time: string) {
    this.timeEnd = time;
  }

  submit() {
    alert(
      `
      Название баннера: ${this.bannerName}
      Дата:  ${this.dateStart} - ${this.dateEnd}
      Время: ${this.timeStart} - ${this.timeEnd}
      `
    )
  }
}
