import { Component } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { AUTHORIZED_MENU, UN_AUTHORIZED_MENU } from '@shared/config';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent {
  public authorizedMenu = AUTHORIZED_MENU;
  public unAuthorizedMenu = UN_AUTHORIZED_MENU;

  constructor(public authService: AuthService) {}
}
