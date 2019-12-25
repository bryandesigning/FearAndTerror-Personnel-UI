import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vex-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  userId: any;
  user: any;
  roles = {};

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
       this.api.getUser(this.userId)
        .subscribe(user => {
          this.user = user;
          this.user.roles = JSON.parse(this.user.roles);

          this.getActivity();
        });
    });
  }

  getActivity() {
    this.api.getUserMessages(this.user.userId)
    .subscribe(res => {
      // console.log(res);
    });
  }

}
