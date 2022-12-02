import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { AuthComponent } from './auth/auth.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { InformationComponent } from './personal/information/information.component';
import { ChangePasswordComponent } from './personal/change-password/change-password.component';
import { AllTreeComponent } from './tree/all-tree/all-tree.component';
import { DetailTreeComponent } from './tree/detail-tree/detail-tree.component';
import { AllToolComponent } from './tool/all-tool/all-tool.component';
import { DetailToolComponent } from './tool/detail-tool/detail-tool.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { DetailPostComponent } from './post/detail-post/detail-post.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AllPotComponent } from './pot/all-pot/all-pot.component';
import { DetailPotComponent } from './pot/detail-pot/detail-pot.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MessageComponent } from './message/message.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IntroComponent } from './intro/intro.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DasboardComponent,
    AuthComponent,
    ForgotpasswordComponent,
    InformationComponent,
    ChangePasswordComponent,
    AllTreeComponent,
    DetailTreeComponent,
    AllToolComponent,
    DetailToolComponent,
    AllPostComponent,
    DetailPostComponent,
    PaginationComponent,
    CardComponent,
    OrderHistoryComponent,
    AllPotComponent,
    DetailPotComponent,
    SearchPageComponent,
    MessageComponent,
    IntroComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
