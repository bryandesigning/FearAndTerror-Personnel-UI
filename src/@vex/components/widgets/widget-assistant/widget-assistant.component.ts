import { Component, OnInit } from '@angular/core';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'vex-widget-assistant',
  templateUrl: './widget-assistant.component.html',
  styleUrls: ['./widget-assistant.component.scss']
})
export class WidgetAssistantComponent implements OnInit {

  icCheckCircle = icCheckCircle;
  username: string;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.username = this.userService.currentUsername;
  }

}
