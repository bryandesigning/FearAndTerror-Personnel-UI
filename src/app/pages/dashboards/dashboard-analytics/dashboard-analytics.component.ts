import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icGroup from '@iconify/icons-ic/twotone-group';
import icPageView from '@iconify/icons-ic/twotone-pageview';
import icCloudOff from '@iconify/icons-ic/twotone-cloud-off';
import icTimer from '@iconify/icons-ic/twotone-timer';
import icComment from '@iconify/icons-ic/comment';
import icvideogame_asset from '@iconify/icons-ic/twotone-videogame-asset';
import { defaultChartOptions } from '../../../../@vex/utils/default-chart-options';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import theme from '../../../../@vex/utils/tailwindcss';
import { ApiService } from 'src/app/util/services/api.service';

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

  voicePerDayOptions = defaultChartOptions({
    chart: {
      type: 'line',
      height: 250,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        show: true,
        autoSelected: 'zoom'
      }
    },
    tooltip: {
      x: {
        show: true,
        format: 'hh:mm TT - MMM dd yyyy'
      },
    },
    title: {
      text: 'Division voice users by hour',
      align: 'left',
      style: {
        fontSize: '12px',
        fontFamily: 'Roboto',
        color: 'rgba(255, 255, 255, 0.7)',
      }
    },
    xaxis: {
      type: 'datetime'
    },
    colors: [ '#f03434', '#22a7f0', '#f7ca18', '#00b16a', '#ffffff' ],
  });

  voicePerDay = [];

  divisions = [
    {
      name: 'Escape From Tarkov',
      search: 'eft',
    },
    {
      name: 'Rainbow 6 Siege',
      search: 'r6s',
    },
    {
      name: 'Squad',
      search: 'sq',
    },
    {
      name: 'Halo',
      search: 'halo',
    },
    {
      name: 'Post Scriptum',
      search: 'post',
    },
  ];

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
          this.userIncreasePercentage = Math.floor(this.discordUsersJoinedTotal / this.userCount * 100);
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
          this.userIncreasePercentage = Math.floor(this.discordUsersJoinedTotal / this.userCount * 100);
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

    this.divisions.forEach((div, index) => {
      this.voicePerDay[index] = {
        name: div.name,
        data: [],
      };

      this.apiService.getVoiceActivityByDivision(div.search, 14)
        .subscribe((data: any) => {
          this.voicePerDay[index] = {
            name: div.name,
            data: Object.keys(data).map(key => {
              return {
                x: key,
                y: data[key].users,
              };
            }),
          };

          this.voicePerDay = [ ...this.voicePerDay ];
        });
    });
  }

  parseTime(value) {
    const inputSeconds = parseInt(value, 0);
    const days = Math.floor(inputSeconds / (3600 * 24));
    const hours = Math.floor(inputSeconds / 3600) - (days * 24);
    const minutes = Math.floor((inputSeconds - (days * 24 * 3600) - (hours * 3600)) / 60);
    const seconds = inputSeconds - (days * 24 * 3600) - (hours * 3600) - (minutes * 60);
    // tslint:disable-next-line: max-line-length
    return `${days} days ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

}
