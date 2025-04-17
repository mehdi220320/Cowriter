import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandpageComponent} from './landpage/landpage.component';
import {EditorComponent} from './editor/editor.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {AccueilComponent} from './accueil/accueil.component';
import {RoomsComponent} from './rooms/rooms.component';
import {BooksComponent} from './books/books.component';
import {BookdetailsComponent} from './books/bookdetails/bookdetails.component';
import {RewriterComponent} from './rewriter/rewriter.component';
import {AboutComponent} from './books/bookdetails/about/about.component';
import {WritersComponent} from './books/bookdetails/writers/writers.component';
import {ChaptersComponent} from './books/bookdetails/chapters/chapters.component';
import {CreateRoomComponent} from './rooms/create-room/create-room.component';
import {RoomComponent} from './rooms/room/room.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'home',component:LandpageComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'editor',component:EditorComponent},
  {path:'contactUs',component:ContactUsComponent},
  {path:'acceuil',component:AccueilComponent},
  {path:'rooms',component:RoomsComponent},
  {path:'room/:id',component:RoomComponent},
  {path:'room/:id/chapter/:id',component:ChaptersComponent},
  {path:'rooms/create',component:CreateRoomComponent},
  {path:'book',component:BooksComponent},
  {path:'ktiba',component:RewriterComponent},
  {path:'book/:id',component:BookdetailsComponent,
    children: [
      { path: '', redirectTo: 'about', pathMatch: 'full' },

      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'writers',
        component: WritersComponent,
      },
      {
        path: 'chapters',
        component: ChaptersComponent,
      }
    ],
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
