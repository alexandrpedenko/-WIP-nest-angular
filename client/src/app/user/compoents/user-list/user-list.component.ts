import { Component, Input } from '@angular/core';
import { IUser } from '@user/types/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users?: IUser[]
}
