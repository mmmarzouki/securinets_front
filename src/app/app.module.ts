import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { HomeModule } from './home/home.module';
import { JudgingComponent } from './judging/judging.component';
import {JudgeReportComponent, JudgeReportContentComponent} from './judge-report/judge-report.component';
import { NotificationComponent } from './notification/notification.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    JudgingComponent,
    JudgeReportComponent,
    JudgeReportContentComponent,
    NotificationComponent,
  ],
  entryComponents: [JudgeReportContentComponent, NotificationComponent],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    HttpModule,
    PerfectScrollbarModule
  ],
  providers: [
      {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
