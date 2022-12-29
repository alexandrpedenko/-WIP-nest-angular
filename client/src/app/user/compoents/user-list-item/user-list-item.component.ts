import { Component, Input } from '@angular/core';
import { IUser } from '@user/types/user.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent {
  @Input() user: IUser
  apiLink = environment.API_LINK;
}
