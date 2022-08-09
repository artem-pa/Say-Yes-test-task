import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DAY_LIST, MONTH_LIST } from 'src/app/constant/constatn';

type DatepickerState = {
  day: number,
  month: string,
  year: number
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  host: {
    '(document:click)': 'onBlur($event, this)'
  }
})
export class DatepickerComponent implements OnInit {

  @Input() value: string;
  @Input() maxValue: string;
  @Input() minValue: string;

  @Output() onChange = new EventEmitter<string>();

  constructor(private elem: ElementRef) { }

  activeDate: DatepickerState;

  isOpen = false;

  weekDays = DAY_LIST.en;
  monthes = MONTH_LIST;
  years = Array.from({ length: 30 }, (_, min) => min + 2020).map(num => num.toString());

  previousMonthDays = [29, 30, 31];
  currentMonthDays = Array.from({ length: 30 }, (_, min) => min + 1);
  nextMonthDays = Array.from({ length: 9 }, (_, min) => min + 1);

  ngOnInit(): void {
    this.value = !this.value ? this.todayDate : this.value;
    this.updateActiveDate();
    setTimeout(() => this.saveValue(), 100);
  }

  toggleDropdown() {
    this.isOpen ? this.closeDropdown() : this.openDropdown();
  }

  openDropdown() {
    this.updateActiveDate();
    this.isOpen = true;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  onBlur(event: any, host: DatepickerComponent) {
    if (!this.isOpen) return;
    if (event.path.indexOf(host.elem.nativeElement) === -1) this.closeDropdown();
  }

  updateActiveDate() {
    const date = new Date(this.value);
    this.activeDate = {
      day: date.getDate(),
      month: this.monthes.names[date.getMonth()],
      year: date.getFullYear()
    }
    this.setCalendar();
  }

  setActiveDay(day: number) {
    this.activeDate.day = day;
  }

  setActiveMonth(month: string) {
    this.activeDate.month = month;
    this.setCalendar();
  }

  setActiveYear(year: string) {
    this.activeDate.year = parseInt(year);
    this.setCalendar();
  }

  setCalendar() {
    this.setCurrentMonth();
    this.setPreviousMonth();
    this.setNextMonth();
  }

  setCurrentMonth() {
    this.currentMonthDays = this.createArray(this.getMonthLenght(), 1)
  }

  setPreviousMonth() {
    const lastDay = (new Date(Date.parse(`${this.activeDate.year}.${this.activeDate.month}`) - 24 * 60 * 60 * 1000));
    if (lastDay.getDay() === 0) {
      this.previousMonthDays = [];
      return;
    }
    this.previousMonthDays = this.createArray(this.getMonthLenght({
      ...this.activeDate,
      month: this.monthes.names[lastDay.getMonth()],
      year: lastDay.getFullYear()
    }), 1).slice(-lastDay.getDay());
  }

  setNextMonth() {
    const monthLength = 42 - this.previousMonthDays.length - this.currentMonthDays.length;
    this.nextMonthDays = this.createArray(monthLength, 1);
  }

  saveValue() {
    if (!this.isValidValue) {
      alert('Wrong value!');
      return;
    }
    const newValue = `${this.activeDate.year} ${this.activeDate.month} ${this.activeDate.day}`;
    this.value = newValue;
    this.onChange.emit(newValue);
    this.closeDropdown();
  }

  createArray(length: number, start: number): number[] {
    return Array.from({ length: length }, (_, k) => k + start);
  }

  getMonthLenght(date = { ...this.activeDate }): number {
    if (date.month === 'February' && this.isLeapYear) {
      return 29;
    }
    return this.monthes.dayCount[this.monthes.names.indexOf(date.month)];
  }

  get todayDate(): string {
    const today = new Date(Date.now());
    return `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;
  }

  get isLeapYear(): boolean {
    return this.activeDate.year % 4 === 0;
  }

  get isValidValue(): boolean {
    const newValue = `${this.activeDate.year} ${this.activeDate.month} ${this.activeDate.day}`;
    if (this.maxValue) {
      return Date.parse(newValue) <= Date.parse(this.maxValue);
    }
    if (this.minValue) {
      return Date.parse(newValue) >= Date.parse(this.minValue);
    }
    return true;
  }
}
