import { Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

type SelectType = 'default' | 'time' | 'dateLight' | 'dateDark';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    '(document:click)': 'onBlur($event, this)'
  }
})
export class SelectComponent implements OnInit{

  @Input() options: string[];
  @Input() value!: string;
  @Input() type: SelectType;
  @Input() placeholder!: string;
  @Input() minValue: string;
  @Input() maxValue: string;

  @Output() onChange = new EventEmitter<string>();

  public currentValue!: string;
  public dropdownOpen: boolean = false;
  public get dropdownElement(): HTMLElement { return this.elem.nativeElement.querySelector('.dropdown-list') }

  constructor( private elem: ElementRef ) { }

  ngOnInit(): void {
    this.currentValue = this.value;
  }

  onBlur(event: any, host: SelectComponent) {
    if (!this.dropdownOpen) return;
    if (event.path.indexOf(host.elem.nativeElement) === -1) this.closeDropdown();
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  select(value: string) {
    console.log(this.options.indexOf(value), value)
    if (!this.isValidValue(value)) {
      alert('Wrong value!');
      return;
    }
    this.currentValue = value;
    this.closeDropdown();
    this.onChange.emit(this.currentValue);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  isValidValue(newValue: string): boolean {
    if (this.maxValue) {
      return newValue <= this.maxValue;
    }
    if (this.minValue) {
      return newValue >= this.minValue;
    }
    return true;
  }

  get selectType(): string {
    switch (this.type) {
      case 'time':
        return 'select-time';
      case 'dateDark':
        return 'select-date dark'
      case 'dateLight':
        return 'select-date light';
      default:
        return '';
    }
  }
}