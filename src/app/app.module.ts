import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { ErrorInterceptor } from './interceptors/ErrorInterceptor';
import { JwtInterceptor } from './interceptors/JwtInterceptor';
import { UserSearchComponent } from './pages/user-search/user-search.component';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import {
  MatTableModule,
  MatPaginatorModule,
  MatChipsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTabsModule,
} from '@angular/material';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ApplicationComponent } from './pages/application/application.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { ViewApplicationComponent } from './pages/applications/view-application/view-application.component';
import { TimeagoModule } from 'ngx-timeago';
import { VoiceActivityTableComponent } from './pages/user-page/voice-activity-table/voice-activity-table.component';
import { DurationPipePipe } from './duration-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserSearchComponent,
    UserPageComponent,
    ApplicationComponent,
    ApplicationsComponent,
    ViewApplicationComponent,
    VoiceActivityTableComponent,
    DurationPipePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PageLayoutModule,
    BreadcrumbsModule,
    MatTableModule,
    ContainerModule,
    MatPaginatorModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    CommonModule,
    MatButtonModule,
    TimeagoModule.forRoot(),

    // Vex
    VexModule,
    CustomLayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
