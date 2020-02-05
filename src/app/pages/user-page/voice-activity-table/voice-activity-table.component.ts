import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/util/services/api.service';

@Component({
  selector: 'vex-voice-activity-table',
  templateUrl: './voice-activity-table.component.html',
  styleUrls: ['./voice-activity-table.component.scss']
})
export class VoiceActivityTableComponent implements OnInit {

  @Input() userId: number;

  displayedColumns: string[] = [ 'channel', 'time', 'jointime', 'leavetime', 'date' ];
  voiceActivity: any[];
  count = 0;
  limit = 20;
  offset = 0;
  pendingLoad = true;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.api.getUserVoice(this.userId)
      .subscribe((res: any) => {
        if (res.count) {
          this.pendingLoad = false;
          this.count = res.count;
          this.limit = res.limit;
          this.offset = res.offset;
          this.voiceActivity = res.rows;
        }
      }, err => {
        console.log(err);
      });
  }

    pageChange(event) {
      if (!this.pendingLoad) {
        this.pendingLoad = true;
        this.api.getUserVoice(this.userId, (event.pageIndex + 1))
          .subscribe((res: any) => {
            if (res.count) {
              this.pendingLoad = false;
              this.count = res.count;
              this.limit = res.limit;
              this.offset = res.offset;
              this.voiceActivity = res.rows;
            }
            this.voiceActivity = [ ...this.voiceActivity ];
          });
      }
    }
  }

