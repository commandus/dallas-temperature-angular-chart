import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { EnvService } from '../../svc/env';
import { DarkModeSwitchComponent } from '../dark-mode-switch/dark-mode-switch.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, DarkModeSwitchComponent],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {
  constructor(
    private router: Router,
    public env: EnvService
  )
  {
  }

  nav(path: string): void {
    this.router.navigateByUrl(path);
  }

}
