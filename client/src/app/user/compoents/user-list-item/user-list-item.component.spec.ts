import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '@shared/material/material.module';
import { userMock } from '@user/mock';
import { environment } from 'src/environments/environment';
import { UserListItemComponent } from './user-list-item.component';

describe('UserListItemComponent', () => {
  let component: UserListItemComponent;
  let fixture: ComponentFixture<UserListItemComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListItemComponent ],
      imports: [ MaterialModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListItemComponent);
    component = fixture.componentInstance;
    component.apiLink = environment.API_LINK;
    component.user = userMock;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct data', () => {
    const userName = debugElement.query(
      By.css('[data-testId="user--userName"]')
    );
    const userCompany = debugElement.query(
      By.css('[data-testId="user--userCompany"]')
    );
    const userOccupation = debugElement.query(
      By.css('[data-testId="user--userOccupation"]')
    );
    const userAvatar = debugElement.query(
      By.css('[data-testId="user--userImage"]')
    );

    expect(userName.nativeElement.textContent).toBe(userMock.userName);
    expect(userCompany.nativeElement.textContent).toBe(userMock.company);
    expect(userOccupation.nativeElement.textContent).toBe(userMock.occupation);
    expect(userAvatar.nativeElement.getAttribute('src'))
      .toBe(`${environment.API_LINK}files/profile-image/${userMock.profileImage}`);
  })
});
