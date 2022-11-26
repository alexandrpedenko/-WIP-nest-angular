import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.setRefreshingToken();
  }

  ngOnDestroy() {
    this.authService.destroySubscribes();
  }
}
