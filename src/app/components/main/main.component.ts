import { Component, OnInit } from '@angular/core';
import { CITY_LIST, DAY_LIST } from '../../constant/constatn';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  days = DAY_LIST;
  cities = CITY_LIST;
  minutes = [0, 15, 30, 45];
  // years = Array.from({ length: 100 }, (_, min) => min + 2000);
  times = this.createTimeList();

  ngOnInit(): void {
  }

  foo(opt: string) {
    console.log(opt)
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

  submit() {
    alert()
  }
}
