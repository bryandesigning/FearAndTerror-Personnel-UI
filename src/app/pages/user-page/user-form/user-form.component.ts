import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'vex-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {

  @Input() user: any;
  form: FormGroup;
  submitted = false;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private toaster: Toaster,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes): void {
    if (changes.user.currentValue) {
      this.form = this.fb.group({
        steamId: [ changes.user.currentValue.steamId, [
          Validators.minLength(17),
          Validators.maxLength(17),
          Validators.pattern('(765)\\d{14}'),
        ]],
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.api.updateUser(this.user.id, this.form.value)
      .subscribe(res => {
        this.user.steamId = this.form.value.steamId;
        this.toaster.open({
          text: 'Updated SteamId',
          position: 'top-right',
          type: 'success',
          duration: 2500,
        });
      });
  }

}
