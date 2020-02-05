import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/util/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vex-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  form: FormGroup;
  uuid: any;
  session: any;
  submitted = false;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.uuid = params.uuid;

        if (!this.uuid) {
          window.location.href = 'http://api.fearandterror.com/v1.0/discord/redirect';
          return;
        }

        this.api.getApplicationSession(params.uuid)
          .subscribe(res => {
            this.session = res;

            this.form = this.fb.group({
              userId: [ this.session.id ],
              username: [ `${this.session.username}#${this.session.discriminator}` ],
              age: [ null, [ Validators.required, Validators.max(99) ] ],
              why: [ null, Validators.required ],
              what: [ null, Validators.required ],
              games: [ null, Validators.required ],
              bring: [ null, Validators.required ],
              skills: [ null, Validators.required ],
              length: [ null, Validators.required ],
              found: [ null, Validators.required ],
            });
          });
      });
  }

  submit() {
    if (!this.form.invalid) {
      this.submitted = true;
      this.api.submitApplication(this.form.value)
        .subscribe(res => {
          console.log(res);
        });
    }
  }

}
