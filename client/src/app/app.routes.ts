import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { ChoiceFormComponent } from './choice-form/choice-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { ProfileComponent } from './profile/profile.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PendingComponent } from './pending/pending.component';
import { AdminRequestsComponent } from './admin-requests/admin-requests.component';
import { RequestsComponent } from './requests/requests.component';



export const routes: Routes = [
    {path:"register",component:UserFormComponent},
    {path:"new/:type",component:ChoiceFormComponent},
    {path:"authenticate",component:LoginFormComponent},
    {path:"",component:LandingPageComponent},
    {path:"home/:type",component:HomeComponent},
    {path:"profile/:id",component:ProfileComponent},
    {path:"pending",component:PendingComponent},
    // { path: '*', redirectTo: '/register', pathMatch: 'full' },
    { path: 'display/:type/:id', component: DisplayComponent },
    {path:'favorites' ,component:FavouriteComponent},
    {path:'admin-dashboard',component:AdminDashbordComponent},
    {path:'admin-requests',component:AdminRequestsComponent},
    {path:'edit/profile',component:EditProfileComponent},
    {path:'request/:id',component:RequestsComponent}
];


// logo          Home Favourits Profile