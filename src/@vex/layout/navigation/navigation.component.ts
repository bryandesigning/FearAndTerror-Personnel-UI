import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { ApiService } from 'src/app/util/services/api.service';
import icSearch from '@iconify/icons-ic/twotone-search';
import { SearchService } from 'src/app/util/services/search.service';

@Component({
  selector: 'vex-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  items = this.navigationService.items;
  icSearch = icSearch;

  @ViewChild('input', { read: ElementRef, static: true }) input: ElementRef;

  constructor(
    private navigationService: NavigationService,
    private search: SearchService,
  ) { }

  ngOnInit() {
  }

  handleSearch() {
    const search = this.input.nativeElement.value;
    if (search === '') {
      return;
    }

    this.search.findUser(search);
  }
}
