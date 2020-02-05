import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/util/services/api.service';
import { AuthenticationService, User } from 'src/app/util/services/authentication.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'vex-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.scss']
})
export class ApplicationViewComponent implements OnInit {
  appId: string;
  application: any;
  currentUser: User;

  statuses: string[] = [ 'voting', 'vote-review', 'pending-introduction', 'paused', 'accepted', 'denied' ];
  statusArray: string[];

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
        });
    });
  }

  buildStatusArray() {
    switch (this.application.status) {
      case 'voting':
        this.statusArray = [ 'voting', 'vote-review', 'paused' ];
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
        this.statusArray = [ 'paused', 'voting', 'pending-introduction', 'denied' ];
        break;
      default:
        break;
    }
  }

  vote(upvote) {
    if (this.application.status === 'voting') {
      this.api.voteApplication(this.appId, upvote)
        .subscribe(res => {
          this.application = { ...res };
          this.toaster.open({
            text: 'Updated vote',
            position: 'top-right',
            type: 'success',
            duration: 2500,
          });
        });
    }
  }

  updateApplicationStatus(event) {
    this.api.updateApplication(this.application.id, event.value, this.application.userId)
      .subscribe(res => {
        this.application.status = event.value;
        this.buildStatusArray();
        this.toaster.open({
          text: 'Updated Application',
          position: 'top-right',
          type: 'success',
          duration: 2500,
        });
      });
  }

}
