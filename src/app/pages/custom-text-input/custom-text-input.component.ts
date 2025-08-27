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

  @Input() model: string = '';
  @Output() modelChange: EventEmitter<any> = new EventEmitter<string>();

  @Input() required: boolean = false;

  onInputChange(value: string) {
    this.model = value;
    this.modelChange.emit(value);
  }
}
