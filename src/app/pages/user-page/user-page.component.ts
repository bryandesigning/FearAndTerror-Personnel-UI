import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { defaultChartOptions } from 'src/@vex/utils/default-chart-options';
import theme from 'src/@vex/utils/tailwindcss';
import icGroup from '@iconify/icons-ic/twotone-group';
import icComment from '@iconify/icons-ic/comment';

@Component({
  selector: 'vex-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  userId: any;
  user: any;
  roles = {};
  theme = theme;
  icGroup = icGroup;
  icComment = icComment;

  voiceWeeklyAverage = '00:00:00';
  voicePerDayOptions = defaultChartOptions({
    chart: {
      type: 'line',
      height: 137,
    },
    tooltip: {
      y: {
        formatter: value => {
          return this.parseTime(value);
        }
      }
    },
    colors: [ theme.colors.orange['500'] ],
  });

  voicePerDay: ApexAxisChartSeries = [{
    name: 'Average daily voice time',
    data: [],
  }];

  messagesWeeklyAverage = 0;
  messagesPerDayOptions = defaultChartOptions({
    chart: {
      type: 'line',
      height: 137,
    },
    colors: [ theme.colors.orange['500'] ],
  });

  messagesPerDay: ApexAxisChartSeries = [{
    name: 'Average daily messages',
    data: [],
  }];

  displayedColumns: string[] = [ 'status', 'username', 'age', 'upvotes', 'downvotes', 'created', 'updated', 'expand' ];
  applications: any[];
  count = 0;
  limit = 20;
  offset = 0;
  pendingLoad = true;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.api.getAllRoles()
      .subscribe((roles: any[]) => {
        roles.forEach(role => {
          this.roles[role.roleId] = role;
        });
      });

    this.route.params.subscribe(params => {
       this.userId = params.userId;
       this.getApplications();
       this.api.getUser(this.userId)
        .subscribe(user => {
          this.user = user;
          this.user.roles = JSON.parse(this.user.roles);

          this.getActivity();
          this.getAverageVoiceTime();
          this.getDailyMessages();
        });
    });
  }

  getActivity() {
    this.api.getUserMessages(this.user.userId)
    .subscribe(res => {
      // console.log(res);
    });
  }

  getDailyMessages() {
    this.api.getUserMessagesDaily(this.user.userId)
      .subscribe((result: any) => {
        const data = result.sort((a, b) => Date.parse(a.date_trunc) - Date.parse(b.date_trunc));
        let total = 0;

        data.forEach(day => {
          total += parseInt(day.count, 0);
          this.messagesPerDay[0].data.push(day.count);
        });

        this.messagesWeeklyAverage = Math.floor(total / data.length);
        this.messagesPerDay = [
          ...this.messagesPerDay,
        ];
      });
  }

  getAverageVoiceTime() {
    this.api.getUserVoiceDaily(this.user.userId)
      .subscribe((result: any) => {
        const data = result.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        let total = 0;

        data.forEach(day => {
          total += parseInt(day.time, 0);
          this.voicePerDay[0].data.push(day.time);
        });

        this.voiceWeeklyAverage = this.parseTime(total / data.length);
        this.voicePerDay = [
          ...this.voicePerDay,
        ];
      });
  }

  parseTime(value) {
    const inputSeconds = parseInt(value, 0);
    const hours = Math.floor(inputSeconds / 3600);
    const minutes = Math.floor((inputSeconds - (hours * 3600)) / 60);
    const seconds = inputSeconds - (hours * 3600) - (minutes * 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  getApplications() {
    this.pendingLoad = true;
    this.api.getUserApplications(this.userId)
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

  pageChange(event) {
    if (!this.pendingLoad) {
      this.pendingLoad = true;
      // this.search.findUserPaginate(this.limit, event.pageIndex);
    }
  }

}
