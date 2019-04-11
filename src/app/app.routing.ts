import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import {JudgingComponent} from './judging/judging.component';

const routes: Routes = [
    { path: 'home',             component: HomeComponent },
    { path: 'login',           component: SignupComponent },
    { path: 'judge',           component: JudgingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
