import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/util/services/search.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'vex-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'steamId', 'roles', 'profile' ];
  searchResults: any[];
  count = 0;
  limit = 20;
  offset = 0;
  pendingLoad = true;

  constructor(
    private search: SearchService,
  ) { }

  ngOnInit() {
    this.search.searchResults.subscribe(res => {
      this.pendingLoad = false;
      this.count = res.count;
      this.limit = res.limit;
      this.offset = res.offset;
      this.searchResults = res.rows;
    });
  }

  pageChange(event) {
    if (!this.pendingLoad) {
      this.pendingLoad = true;
      this.search.findUserPaginate(this.limit, event.pageIndex + 1);
    }
  }

}
