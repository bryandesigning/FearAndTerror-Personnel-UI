import { Component, OnInit, Input } from '@angular/core';
import { defaultChartOptions } from 'src/@vex/utils/default-chart-options';
import { ApexOptions } from 'src/@vex/components/chart/chart.component';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icCloudDownload from '@iconify/icons-ic/twotone-cloud-download';
import faCaretUp from '@iconify/icons-fa-solid/caret-up';
import faCaretDown from '@iconify/icons-fa-solid/caret-down';
import theme from 'src/@vex/utils/tailwindcss';
import { ApiService } from 'src/app/util/services/api.service';
import icDelete from '@iconify/icons-ic/twotone-delete';


@Component({
  selector: 'vex-channel-message-graph',
  templateUrl: './channel-message-graph.component.html',
  styleUrls: ['./channel-message-graph.component.scss']
})
export class ChannelMessageGraphComponent implements OnInit {

  @Input() channels: any;
  @Input() options: ApexOptions = defaultChartOptions({
    grid: {
      show: true,
      strokeDashArray: 3,
      padding: {
        left: 16
      }
    },
    chart: {
      type: 'line',
      height: 300,
      sparkline: {
        enabled: false
      },
      zoom: {
        enabled: false
      }
    },
    stroke: {
      width: 4
    },
    yaxis: {
      labels: {
        show: true
      }
    }
  });

  days = 7;
  loadedChannels = [];
  icDelete = icDelete;

  series: ApexAxisChartSeries = [{
    name: 'Messages Per Day',
    data: [],
  }];

  seriesOptions = defaultChartOptions({
    chart: {
      type: 'line',
      height: 137,
    },
    colors: [ theme.colors.orange['500'] ]
  });

  icMoreHoriz = icMoreHoriz;
  icCloudDownload = icCloudDownload;
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;

  theme = theme;
  total: string;
  increasePercentage: number;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.loadChartData('', 'All Channels');
  }

  handleChange({ value }) {
    if (this.loadedChannels.length !== 5) {
      this.loadChartData(value.channelId, value.name);
    }

    console.log(this.series);
  }

  removeChannel(channel) {
    this.loadedChannels = this.loadedChannels.filter(c => c.channelId !== channel.channelId);
    this.drawGraph();
  }

  loadChartData(channelId, name) {
    this.apiService.getNewMessagesByDay(this.days, channelId)
      .subscribe((result: any) => {
        this.series[0].data = [];
        this.total = 'Loading...';
        this.increasePercentage = 0;

        if (result.length > 0) {
          const channel = {
            name,
            channelId,
            total: 0,
            data: [],
          };

          let data = result.sort((a, b) => Date.parse(a.date_trunc) - Date.parse(b.date_trunc));

          if (data.length < 7) {
            const tempObject = {};

            // Loop through and populate our temp array
            data.forEach(day => {
              const temp = new Date(day.date_trunc);
              const tempDay = Date.parse(new Date(temp.getFullYear(), temp.getMonth(), temp.getDate()).toDateString());
              tempObject[tempDay] = {
                date: tempDay,
                count: day.count,
              };
            });

            for (let index = 0; index < 7; index++) {
              const now = new Date();
              now.setDate(now.getDate() - index);
              const currentDate = Date.parse(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toDateString());

              if (!tempObject[currentDate]) {
                tempObject[currentDate] = {
                  date: currentDate,
                  count: '0',
                };
              }
            }

            data = Object.values(tempObject).sort((a: any, b: any) => a.date - b.date);
          }

          data.forEach(day => {
            const count = parseInt(day.count, 0);
            channel.total += count;
            channel.data.push(count as any);
          });

          this.loadedChannels.push(channel);
          if (this.loadedChannels.length > 5) {
            this.loadedChannels.shift();
          }

          this.drawGraph();
        }
      });
  }

  drawGraph() {
    this.series = [];
    if (this.loadedChannels.length > 0) {

      this.loadedChannels.forEach(channel => {
        this.series.push({
          name: channel.name,
          data: channel.data,
        });
      });

      this.series = [
        ...this.series,
      ];
    }
  }

}
