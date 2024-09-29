import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { RegistrationFormComponent } from './registration/registration-form/registration-form.component';
import { RegistrationListComponent } from './registration/registration-list/registration-list.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'add',component:RegistrationFormComponent},
    {path:'add/:id',component:RegistrationFormComponent},
    {path:'list',component:RegistrationListComponent}
];
