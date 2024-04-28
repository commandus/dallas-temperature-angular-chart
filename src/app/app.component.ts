import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnvService } from '../svc/env';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @HostBinding('class')
  
  title = 'Dallas temperature sensor test';

  public get themeMode() {
    return this.env.settings.darkMode ? 'dark' : 'light';
  }

  constructor(
    private env: EnvService
  ) {
    // @see https://thecodeshewrites.com/2021/06/16/angular-material-dark-light-theme/#htoc-theme-management-with-angular-material
    this.env.darkThemeOn(this.env.settings.darkMode);
  }
}
