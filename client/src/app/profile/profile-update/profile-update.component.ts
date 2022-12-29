import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { ProfileService } from '@profile/profile.service';
import { ToastService } from '@shared/components/toast/toast.service';
import { IUser } from '@user/types/user.interface';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
  user: IUser | null;
  updateProfileForm: FormGroup;
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.updateProfileForm = this.formBuilder.group({
      userName: ['', {
        validators: [Validators.required],
      }],
      company: [''],
      occupation: [''],
    });

    this.route.params.subscribe(param => {
      this.userId = param['id'];
      this.profileService.getUser(param['id']).pipe(take(1)).subscribe((user) => {
        this.updateProfileForm.setValue({
          userName: user.userName ? user.userName : '',
          company: user.company ? user.company : '',
          occupation: user.occupation ? user.occupation : '',
        })
      });
    });
  }

  get username() {
    return this.updateProfileForm.get('username');
  }

  onSubmit() {
    this.profileService.updateProfile(this.userId, this.updateProfileForm.value)
      .pipe(
        take(1),
        tap({
          next: (x) => this.toastService.toast({
            title: 'Success',
            message: 'Profile has been updated',
            toastType: 'success'
          })
        }),
      ).subscribe();
  }
}
