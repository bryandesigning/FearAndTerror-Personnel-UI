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

  statuses: string[] = [ 'voting', 'vote-review', 'pending-interview', 'paused', 'accepted', 'denied' ];
  user: User;

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

          this.api.getUser(this.application.userId)
            .subscribe((user: any) => {
              this.user = user;
            });
        });
    });
  }

  updateApplicationStatus(event) {
    this.api.updateApplication(this.application.id, event.value)
      .subscribe(res => {
        console.log(res);
        this.toaster.open({
          text: 'Updated Application',
          position: 'top-right',
          type: 'success',
          duration: 2500,
        });
      });
  }

}