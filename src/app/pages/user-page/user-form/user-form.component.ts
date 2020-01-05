import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

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
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes): void {
    if (changes.user.currentValue) {
      console.log(changes.user.currentValue);
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
        console.log(res);
      });
  }

}
