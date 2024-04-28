import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dark-mode-switch',
  standalone: true,
  imports: [MatSlideToggle],
  templateUrl: './dark-mode-switch.component.html',
  styleUrl: './dark-mode-switch.component.scss'
})
export class DarkModeSwitchComponent{
  @Input() checked = false;
  @Output() darkThemeOn: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  public onToggle(toggle: MatSlideToggle) {
    this.darkThemeOn.emit(toggle.checked);
  }
}
