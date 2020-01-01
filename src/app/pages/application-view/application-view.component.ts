import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService, User } from 'src/app/services/authentication.service';

@Component({
  selector: 'vex-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.scss']
})
export class ApplicationViewComponent implements OnInit {
  appId: string;
  application: any;
  currentUser: User;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
  ) { }

  // appId

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

          console.log(this.application);
        });
    });
  }

  vote(upvote) {
    this.api.voteApplication(this.appId, upvote)
      .subscribe(res => {
        this.application = { ...res };
        console.log(res);
      });
  }

}
