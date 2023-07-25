import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { BookAddEditComponent } from './book/book-add-edit/book-add-edit.component';
import { UserComponent } from './user/user.component';
import { UserAddEditComponent } from './user/user-add-edit/user-add-edit.component';

//Array to hold route definitions
  const routes: any[] = [
    { path: 'book', 
      component: BookComponent,
    },
    { path: 'book/add', 
      component: BookAddEditComponent
    },
    { path: 'book/edit', 
      component: BookAddEditComponent
    },
    { path: 'book/edit/:id', 
      component: BookAddEditComponent
    },
    {
      path: 'user',
      component: UserComponent
    },
    {
      path: 'user/add',
      component: UserAddEditComponent
    },
    {
      path: 'user/edit',
      component: UserAddEditComponent
    },
    {
      path: 'user/edit/:id',
      component: UserAddEditComponent
    },
    { path: 'home', 
      component: HomeComponent
    },
    { path: '', 
      redirectTo: '/home', 
      pathMatch: 'full'
    }  
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }