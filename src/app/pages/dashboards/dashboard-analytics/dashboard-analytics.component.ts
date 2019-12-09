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

  tableColumns: TableColumn<Order>[] = [
    {
      label: '',
      property: 'status',
      type: 'badge'
    },
    {
      label: 'PRODUCT',
      property: 'name',
      type: 'text'
    },
    {
      label: '$ PRICE',
      property: 'price',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'DATE',
      property: 'timestamp',
      type: 'text',
      cssClasses: ['text-secondary']
    }
  ];
  tableData = tableSalesData;

  series: ApexAxisChartSeries = [{
    name: 'Subscribers',
    data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44]
  }];

  userSessionsSeries: ApexAxisChartSeries = [
    {
      name: 'Users',
      data: [10, 50, 26, 50, 38, 60, 50, 25, 61, 80, 40, 60]
    },
    {
      name: 'Sessions',
      data: [5, 21, 42, 70, 41, 20, 35, 50, 10, 15, 30, 50]
    },
  ];

  salesSeries: ApexAxisChartSeries = [{
    name: 'Sales',
    data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87]
  }];

  pageViewsSeries: ApexAxisChartSeries = [{
    name: 'Page Views',
    data: [405, 800, 200, 600, 105, 788, 600, 204]
  }];

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

  constructor(
    private cd: ChangeDetectorRef,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.apiService.getUserCount()
      .subscribe((result: any) => {
        this.userCount = result.count;

        if (this.discordUsersJoinedTotal > 0) {
          this.userIncreasePercentage = this.discordUsersJoinedTotal / this.userCount * 100;
        }
      });

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

    this.apiService.getTotalMessageCount()
      .subscribe((result: any) => {
        this.totalMessageCount = `${(result.count / 1000).toFixed(1)}k`;
      });

    this.apiService.getTotalSquadEvents()
      .subscribe((result: any) => {
        this.totalSquadEvents = result.count;
      });

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


    setTimeout(() => {
      const temp = [
        {
          name: 'Subscribers',
          data: [55, 213, 55, 0, 213, 55, 33, 55]
        },
        {
          name: ''
        }
      ];
    }, 3000);
  }

}
