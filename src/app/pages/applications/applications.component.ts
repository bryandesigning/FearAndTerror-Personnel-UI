import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'vex-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

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
    this.api.getApplications()
      .subscribe((res: any) => {
        if (res.count) {
          this.pendingLoad = false;
          this.count = res.count;
          this.limit = res.limit;
          this.offset = res.offset;
          this.applications = res.rows;
        }
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  pageChange(event) {
    if (!this.pendingLoad) {
      this.pendingLoad = true;
      // this.search.findUserPaginate(this.limit, event.pageIndex);
    }
  }

}
