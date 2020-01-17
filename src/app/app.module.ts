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
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ApplicationComponent } from './pages/application/application.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { TimeagoModule } from 'ngx-timeago';
import { VoiceActivityTableComponent } from './pages/user-page/voice-activity-table/voice-activity-table.component';
import { DurationPipePipe } from './duration-pipe.pipe';
import { WidgetQuickLineChartModule } from 'src/@vex/components/widgets/widget-quick-line-chart/widget-quick-line-chart.module';
import { ApplicationViewComponent } from './pages/application-view/application-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserNotesComponent } from './pages/user-page/user-notes/user-notes.component';
import { UserFormComponent } from './pages/user-page/user-form/user-form.component';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { ApplicationInterviewComponent } from './pages/application-interview/application-interview.component';
import { SteamProfileComponent } from './components/steam-profile/steam-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserSearchComponent,
    UserPageComponent,
    ApplicationComponent,
    ApplicationsComponent,
    VoiceActivityTableComponent,
    DurationPipePipe,
    ApplicationViewComponent,
    UserNotesComponent,
    UserFormComponent,
    ApplicationInterviewComponent,
    SteamProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastNotificationsModule,
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
    WidgetQuickLineChartModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
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
