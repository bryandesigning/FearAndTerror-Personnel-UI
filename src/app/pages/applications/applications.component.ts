import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'vex-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  statuses: string[] = [ 'voting', 'vote-review', 'pending-interview', 'paused', 'accepted', 'denied' ];
  currentStatus = 'voting';

  displayedColumns: string[] = [ 'status', 'username', 'age', 'upvotes', 'downvotes', 'created', 'updated', 'expand' ];
  applications: any[];
  count = 0;
  limit = 20;
  offset = 0;
  pendingLoad = true;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.getApplications();
  }

  getApplications(page = 0) {
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

  handleChange(event) {
    this.currentStatus = event.value;
    this.getApplications();
  }

  pageChange(event) {
    if (!this.pendingLoad) {
      this.pendingLoad = true;
      this.getApplications(event.pageIndex + 1);
    }
  }

}
