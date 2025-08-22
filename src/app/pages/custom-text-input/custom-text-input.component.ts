import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-text-input.component.html',
  styleUrls: ['./custom-text-input.component.css']
})
export class CustomTextInputComponent {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';

  @Input() model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() required: boolean = false;

  onInputChange(value: any) {
    this.model = value;
    this.modelChange.emit(value);
  }
}
