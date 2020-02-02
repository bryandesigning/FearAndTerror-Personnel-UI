import { Component, OnInit } from '@angular/core';
import { User, AuthenticationService } from 'src/app/services/authentication.service';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'vex-application-interview',
  templateUrl: './application-interview.component.html',
  styleUrls: ['./application-interview.component.scss']
})
export class ApplicationInterviewComponent implements OnInit {
  appId: string;
  application: any;
  currentUser: User;

  statuses: string[] = [ 'voting', 'vote-review', 'pending-introduction', 'paused', 'accepted', 'denied' ];
  statusArray: string[] = [];
  user: User;
  disablePing = false;
  promoted = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private toaster: Toaster,
    private router: Router,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(cu => {
      this.currentUser = cu;
    });
    this.route.params.subscribe(params => {
       this.appId = params.appId;

       this.api.getApplication(this.appId)
        .subscribe((res: any) => {
          if (!res) {
            return this.router.navigate(['/404']);
          }

          this.application = res;

          this.buildStatusArray();

          this.api.getUser(this.application.userId)
            .subscribe((user: any) => {
              this.user = user;
            });
        });
    });
  }

  buildStatusArray() {
    switch (this.application.status) {
      case 'voting':
        this.statusArray = [ 'voting', 'pending-introduction', 'paused' ];
        break;
      case 'vote-review':
        this.statusArray = [ 'vote-review', 'pending-introduction', 'denied', 'paused' ];
        break;
      case 'pending-introduction':
        this.statusArray = [ 'pending-introduction' ];
        break;
      case 'accepted':
        this.statusArray = [ 'accepted' ];
        break;
      case 'denied':
        this.statusArray = [ 'denied' ];
        break;
      case 'paused':
        this.statusArray = [ 'paused', 'voting', 'vote-review', 'pending-introduction' ];
        break;
      default:
        break;
    }
  }

  updateApplicationStatus(event) {
    this.api.updateApplication(this.application.id, event.value, this.application.userId)
      .subscribe(res => {
        this.toaster.open({
          text: 'Updated Application',
          position: 'top-right',
          type: 'success',
          duration: 2500,
        });
      });
  }

  rolePing() {
    if (this.disablePing) {
      return;
    }

    this.disablePing = true;
    this.api.pingTagChannel(this.application.userId)
      .subscribe(res => {
        this.toaster.open({
          text: 'Pinged applicant in #channel-signups',
          position: 'top-right',
          type: 'success',
          duration: 2500,
        });
      });
  }

  promoteApplicant() {
    if (this.promoted) {
      return;
    }

    this.promoted = true;
    this.api.promoteApplicant(this.application.userId)
      .subscribe(res => {
        console.log(res);
        this.toaster.open({
          text: 'Promoted applicant to recruit',
          position: 'top-right',
          type: 'success',
          duration: 2500,
        });
      })
  }

}
