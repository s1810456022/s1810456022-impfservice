import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacevent } from '../shared/vacevent';
import { VaceventService } from '../shared/vacevent.service';
import { DatePipe } from '@angular/common';
import { VaclocationService } from '../shared/vaclocation.service';
import { Vaclocation } from '../shared/vaclocation';
import { VaceventFactory } from '../shared/vacevent-factory';
import { ToastrService } from 'ngx-toastr';
import { VaceventDetailsFormErrorMessages } from './vacevent-details-form-error-messages';
import moment from 'moment';

@Component({
  selector: 'vac-vacevent-details-form',
  templateUrl: './vacevent-details-form.component.html'
})
export class VaceventDetailsFormComponent implements OnInit {
  id: bigint;
  vaceventForm: FormGroup;
  isUpdatingVacevent = false;
  errors: { [key: string]: string } = {};
  datePipeStart: string;
  datePipeEnd: string;
  vaclocation: Vaclocation[];
  vacevent: Vacevent = VaceventFactory.empty();
  state: string = '';

  constructor(
    private fb: FormBuilder,
    private vac: VaceventService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private vacloc: VaclocationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.state = this.route.snapshot.params['state'];
    if (id !== undefined) {
      this.isUpdatingVacevent = true;
      this.vac.getSingle(id).subscribe(vacevent => {
        this.vacevent = vacevent;
        this.initVacevent();
      });
    }
    this.vacloc.getLocationByState(this.state).subscribe(vaclocation => {
      this.vaclocation = vaclocation;
      this.initVacevent();
    });
    this.initVacevent();
  }

  initVacevent() {
    this.datePipeStart = this.datePipe.transform(
      this.vacevent.startTime,
      'HH:mm'
    );
    this.datePipeEnd = this.datePipe.transform(this.vacevent.endTime, 'HH:mm');

    this.vaceventForm = this.fb.group({
      id: this.vacevent.id,
      vaclocation_id: [this.vacevent.vaclocation_id, Validators.required],
      maxVac: [this.vacevent.maxVac, [Validators.required, Validators.min(1)]],
      date: [this.vacevent.date, Validators.required],
      startTime: [this.datePipeStart, Validators.required],
      endTime: [this.datePipeEnd, Validators.required]
    });
    this.vaceventForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of VaceventDetailsFormErrorMessages) {
      const control = this.vaceventForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  submitForm() {
    let updatedVacevent: Vacevent = VaceventFactory.fromObject(
      this.vaceventForm.value
    );
    const startTimeNew = moment(
      this.vaceventForm.value.date + ' ' + this.vaceventForm.value.startTime
    ).toDate();
    const endTimeNew = moment(
      this.vaceventForm.value.date + ' ' + this.vaceventForm.value.endTime
    ).toDate();
    updatedVacevent.startTime = startTimeNew;
    updatedVacevent.endTime = endTimeNew;
    this.vacloc
      .getLocationById(this.vaceventForm.controls['vaclocation_id'].value)
      .subscribe(res => {
        updatedVacevent.vaclocation = res;
      });

    if (this.isUpdatingVacevent) updatedVacevent.users = this.vacevent.users;
    else updatedVacevent.users = [];

    if (this.isUpdatingVacevent) {
      this.vac.update(updatedVacevent).subscribe(res => {
        this.toastr.success('Impftermin erfolgreich geändert');
        this.reloadCurrentRoute();
      });
    } else {
      this.vac.create(updatedVacevent).subscribe(res => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
    }
  }
}
