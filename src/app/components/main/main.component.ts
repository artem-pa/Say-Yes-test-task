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

  dateStart: string;
  dateEnd: string;
  minDate: string;
  maxDate: string;

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

  updateMinDate(date: string) {
    this.minDate = date;
  }

  updateMaxDate(date: string) {
    this.maxDate = date;
  }

  submit() {
    alert()
  }
}
