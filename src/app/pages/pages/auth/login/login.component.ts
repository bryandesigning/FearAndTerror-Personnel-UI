import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { DOCUMENT } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  error: string;
  code: any;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private auth: AuthenticationService,
  ) {}

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.code = this.route.snapshot.queryParams.code;

    if (this.code) {
      this.auth.loginDiscord(this.code)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([ this.returnUrl ]);
          },
          error => {
            if (error.includes('400')) {
              return this.error = 'Missing required discord role(s)';
            }
            this.error = 'Discord Login Failed - Try again';
          });
    }
  }

  login() {
    // tslint:disable-next-line: max-line-length
    this.document.location.href = 'https://discordapp.com/api/oauth2/authorize?client_id=651122365006086144&redirect_uri=http%3A%2F%2Fpersonnel.squadhosting.com%2Flogin&response_type=code&scope=identify';
  }

}
