import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'vex-steam-profile',
  templateUrl: './steam-profile.component.html',
  styleUrls: ['./steam-profile.component.scss']
})
export class SteamProfileComponent implements OnInit, OnChanges {

  @Input() steamId: string;

  steamData: {
    steamid: string;
    communityvisibilitystate: number;
    profilestate: number;
    personaname: string;
    lastlogoff: number;
    commentpermission: number;
    profileurl: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    personastate: number;
    primaryclanid: string;
    timecreated: number;
    personastateflags: number;
  };

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getSteamData();
  }

  getSteamData() {
    if (this.steamId) {
      this.api.getSteamData(this.steamId)
        .subscribe((steamUser: any) => {
          this.steamData = steamUser.players.find(p => p.steamid === this.steamId);
        });
    }
  }

}
