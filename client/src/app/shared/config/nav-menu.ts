export const AUTHORIZED_MENU = [
  {
    routerLink: 'new',
    text: 'Add Post',
    icon: 'note_add',
  },
  {
    routerLink: 'home',
    text: 'Home',
    icon: 'home',
  },
  {
    routerLink: 'search',
    text: 'Search',
    icon: 'search',
  },
  {
    routerLink: 'profile',
    text: 'Profile',
    icon: 'person',
  }
];

export const UN_AUTHORIZED_MENU = [
  {
    routerLink: 'auth/login',
    text: 'LogIn'
  },
  {
    routerLink: 'auth/register',
    text: 'SignUp'
  }
];
