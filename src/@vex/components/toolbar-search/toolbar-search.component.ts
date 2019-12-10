import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import icSearch from '@iconify/icons-ic/twotone-search';

@Component({
  selector: 'vex-toolbar-search',
  templateUrl: './toolbar-search.component.html',
  styleUrls: ['./toolbar-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarSearchComponent implements OnInit {

  isOpen: boolean;
  icSearch = icSearch;

  @ViewChild('input', { read: ElementRef, static: true }) input: ElementRef;
  @Output() search = new EventEmitter<string>();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
  }

  open() {
    this.isOpen = true;
    this.cd.markForCheck();

    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.cd.markForCheck();
  }

  submit() {
    this.search.emit(this.input.nativeElement.value);
  }
}
