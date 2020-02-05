import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/util/services/api.service';
import { AuthenticationService, User } from 'src/app/util/services/authentication.service';

@Component({
  selector: 'vex-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  statuses: string[] = [ 'voting', 'vote-review', 'pending-introduction', 'paused', 'accepted', 'denied' ];
  currentStatus: string;

  displayedColumns: string[] = [ 'status', 'username', 'age', 'upvotes', 'downvotes', 'created', 'updated', 'expand' ];
  applications: any[];
  count = 0;
  limit = 20;
  offset = 0;
  pendingLoad = true;
  currentUser: User;

  constructor(
    private api: ApiService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.getApplications();

    this.authService.currentUser.subscribe(cu => {
      this.currentUser = cu;
    });
  }

  getApplications(page = 0) {
    // Load currentStatus from localstorage if we don't already have it
    if (!this.currentStatus) {
      this.currentStatus = localStorage.getItem('currentStatus') || 'voting';
    }

    this.pendingLoad = true;
    this.api.getApplications(this.currentStatus, page)
      .subscribe((res: any) => {
        if (res.count >= 0) {
          this.pendingLoad = false;
          this.count = res.count;
          this.limit = res.limit;
          this.offset = res.offset;
          this.applications = res.rows;
        }
      }, err => {
        this.pendingLoad = false;
      });
  }

  handleChange(status) {
    this.currentStatus = status;
    localStorage.setItem('currentStatus', this.currentStatus);
    this.getApplications();
  }

  pageChange(event) {
    if (!this.pendingLoad) {
      this.pendingLoad = true;
      this.getApplications(event.pageIndex + 1);
    }
  }

}
