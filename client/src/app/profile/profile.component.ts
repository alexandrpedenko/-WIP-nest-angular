import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser } from '@user/types/user.interface';
import { AuthService } from '@auth/services/auth.service';
import { ProfileService } from './profile.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { UnsubscribeSubject } from '@shared/utils/rxjs-unsubscribe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public readonly apiLink = environment.API_LINK;
  public user$: Observable<IUser | null>
  public currentUser: boolean;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.user$ = this.profileService.getUser(param['id']);
      this.currentUser = this.authService.loggedInUser?._id === param['id'];
    });
  }
}
