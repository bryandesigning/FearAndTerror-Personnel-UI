import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icGroup from '@iconify/icons-ic/twotone-group';
import icPageView from '@iconify/icons-ic/twotone-pageview';
import icCloudOff from '@iconify/icons-ic/twotone-cloud-off';
import icTimer from '@iconify/icons-ic/twotone-timer';
import icComment from '@iconify/icons-ic/comment';
import icvideogame_asset from '@iconify/icons-ic/twotone-videogame-asset';
import { defaultChartOptions } from '../../../../@vex/utils/default-chart-options';
import { Order, tableSalesData } from '../../../../static-data/table-sales-data';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import theme from '../../../../@vex/utils/tailwindcss';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'vex-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss']
})
export class DashboardAnalyticsComponent implements OnInit {

  discordUsersJoined: ApexAxisChartSeries = [{
    name: 'New Users',
    data: [],
  }];

  discordUsersJoinedOptions = defaultChartOptions({
    chart: {
      type: 'line',
      height: 137,
    },
    colors: [ theme.colors.primary['500'] ]
  });

  messagesPerDay: ApexAxisChartSeries = [{
    name: 'Messages Per Day',
    data: [],
  }];

  messagesPerDayOptions = defaultChartOptions({
    chart: {
      type: 'line',
      height: 137,
    },
    colors: [ theme.colors.orange['500'] ]
  });

  icGroup = icGroup;
  icPageView = icPageView;
  icCloudOff = icCloudOff;
  icTimer = icTimer;
  icMoreVert = icMoreVert;
  icComment = icComment;
  icVideoGame = icvideogame_asset;

  theme = theme;
  userCount = 0;
  discordUsersJoinedTotal = 0;
  userIncreasePercentage = 0;
  averageVoice: {
    hours: number;
    minutes: number;
    seconds: number;
    displayString: string;
    uniqueChannels: number;
  } = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    displayString: 'Loading...',
    uniqueChannels: 0,
  };
  totalMessageCount = 'Loading...';
  totalSquadEvents = 'Loading...';
  messageIncreasePercentage = 0;
  channels: any;

  constructor(
    private cd: ChangeDetectorRef,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    // User Count
    this.apiService.getUserCount()
      .subscribe((result: any) => {
        this.userCount = result.count;

        if (this.discordUsersJoinedTotal > 0) {
          this.userIncreasePercentage = this.discordUsersJoinedTotal / this.userCount * 100;
        }
      });

    // New users per day graph
    this.apiService.getNewUsersByDay()
      .subscribe((result: any) => {
        const data = result.sort((a, b) => Date.parse(a.date_trunc) - Date.parse(b.date_trunc));
        data.forEach(day => {
          const count = parseInt(day.count, 0);
          this.discordUsersJoinedTotal += count;
          this.discordUsersJoined[0].data.push(count as any);
        });

        this.discordUsersJoined = [
          ...this.discordUsersJoined,
        ];

        if (this.userCount > 0) {
          this.userIncreasePercentage = this.discordUsersJoinedTotal / this.userCount * 100;
        }
      });

    // messages per day chart
    this.apiService.getNewMessagesByDay()
      .subscribe((result: any) => {
        const data = result.sort((a, b) => Date.parse(a.date_trunc) - Date.parse(b.date_trunc));
        let total = 0;

        data.forEach(day => {
          const count = parseInt(day.count, 0);
          total += count;
          this.messagesPerDay[0].data.push(count as any);
        });

        const lastDay = parseInt(data[data.length - 1].count, 0);
        this.messageIncreasePercentage = Math.floor(lastDay / (total - lastDay) * 100);
        this.totalMessageCount = `${(total / 1000).toFixed(1)}k`;

        this.messagesPerDay = [
          ...this.messagesPerDay,
        ];
      });

    // Squad Events total
    this.apiService.getTotalSquadEvents()
      .subscribe((result: any) => {
        this.totalSquadEvents = result.count;
      });

    // Average Voice Time
    this.apiService.getAverageVoiceTime()
      .subscribe((result: any) => {

        let totalSeconds = Math.floor(parseInt(result.averageTime, 0));
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        let displayString = '';

        if (hours > 0) {
          displayString = `${hours}h `;
        }

        if (minutes > 0) {
          displayString = `${displayString}${minutes}m `;
        }

        if (seconds > 0) {
          displayString = `${displayString}${seconds}s`;
        }

        this.averageVoice = {
          hours,
          minutes,
          seconds,
          displayString,
          uniqueChannels: parseInt(result.uniqueChannels, 0),
        };
      });

    this.apiService.getAllChannels()
      .subscribe((result: any) => {
        this.channels = result;
      });
  }

}
