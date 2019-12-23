import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  _searchResults = new BehaviorSubject({});
  public readonly searchResults: Observable<any> = this._searchResults.asObservable();

  lastNeedle = '';

  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  findUser(needle) {
    if (this.router.url !== '/users/search') {
      this.router.navigate(['/users/search']);
    }

    this.lastNeedle = needle;

    this.api.searchUser({ search: needle })
      .subscribe((res: any) => {
        this._searchResults.next(res);
      });
  }

  findUserPaginate(limit, page) {
    if (this.router.url !== '/users/search') {
      this.router.navigate(['/users/search']);
    }

    this.api.searchUser({ search: this.lastNeedle, limit, page })
      .subscribe((res: any) => {
        this._searchResults.next(res);
      });
  }
}
