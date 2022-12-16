import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { DetailComponent } from './detail/detail.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { MessageComponent } from './message/message.component';
import { HistoryComponent } from './order/history/history.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { ChangePasswordComponent } from './personal/change-password/change-password.component';
import { InformationComponent } from './personal/information/information.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { DetailPostComponent } from './post/detail-post/detail-post.component';
import { AllPotComponent } from './pot/all-pot/all-pot.component';
import { DetailPotComponent } from './pot/detail-pot/detail-pot.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { Auth } from './services/guard/auth.guard.guard';
import { AllToolComponent } from './tool/all-tool/all-tool.component';
import { DetailToolComponent } from './tool/detail-tool/detail-tool.component';
import { AllTreeComponent } from './tree/all-tree/all-tree.component';
import { DetailTreeComponent } from './tree/detail-tree/detail-tree.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotpasswordComponent
  },
  {
    path: '',
    component: DasboardComponent,
    children:[
      {
        path:'home',
        component:HomeComponent
      }
    ]
  },
  {
    path: 'tree',
    component: DasboardComponent,
    children:[
      {
        path:'all',
        component: AllTreeComponent
      }
    ]
  },
  {
    path: 'tool',
    component: DasboardComponent,
    children:[
      {
        path:'all',
        component: AllToolComponent
      },
    ]
  },
  {
    path: 'post',
    component: DasboardComponent,
    children:[
      {
        path:'all',
        component: AllPostComponent
      },
      {
        path:'detail/:id',
        component: DetailPostComponent
      }
    ]
  },
  {
    path: 'pot',
    component: DasboardComponent,
    children:[
      {
        path:'all',
        component: AllPotComponent
      },
    ]
  },
  {
    path: 'product',
    component: DasboardComponent,
    children:[
      {
        path:'detail/:type/:id',
        component: DetailComponent
      },
    ]
  },
  {
    path: 'personnal',
    component: DasboardComponent,
    canActivate: [Auth],
    children:[
      {
        path:'information',
        component: InformationComponent
      },
      {
        path:'changepassword',
        component: ChangePasswordComponent
      }
    ]
  },
  {
    path: 'order',
    component: DasboardComponent,
    canActivate: [Auth],
    children:[
      {
        path:'history',
        component: HistoryComponent
      },
      {
        path:'detail',
        component: OrderDetailComponent
      },
      {
        path:'cart',
        component: CartComponent
      }
    ]
  },
  {
    path: 'search',
    component: DasboardComponent,
    children:[
      {
        path:'product/:searchStr',
        component: SearchPageComponent
      }
    ]
  },
  {
    path: 'chat',
    component: DasboardComponent,
    canActivate: [Auth],
    children:[
      {
        path:'message',
        component: MessageComponent
      }
    ]
  },
  {
    path: 'contact',
    component: DasboardComponent,
    children:[
      {
        path:'',
        component: ContactComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
