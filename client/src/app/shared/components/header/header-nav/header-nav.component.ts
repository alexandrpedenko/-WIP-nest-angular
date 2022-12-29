import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { AUTHORIZED_MENU, UN_AUTHORIZED_MENU } from '@shared/config';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit{
  public authorizedMenu = AUTHORIZED_MENU;
  public unAuthorizedMenu = UN_AUTHORIZED_MENU;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authorizedMenu = this.authorizedMenu.map(navItem => {
      return navItem.text === 'Profile' ? {
        ...navItem,
        routerLink: `profile/${this.authService.loggedInUser?._id}`
      } : navItem;
    });
  }
}
