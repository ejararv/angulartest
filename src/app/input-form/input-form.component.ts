import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { FirebaseService, IPayments } from '../srvices/firebase.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent {
  payments: any = [];
  vat: number = 0;
  netto: number = 0;
  position: string = '';
  contractor: string = '';
  description: string = '';

  paymentsForm = this.fb.group({
    id: Date.now(),
    netto: [this.netto, [Validators.required]],
    vat: this.vat,
    position: this.position,
    contractor: this.contractor,
    description: this.description,
  });

  vatOptions = [
    { name: '23', option: 23 },
    { name: '7', option: 7 },
  ];

  constructor(private fb: FormBuilder, private storeService: FirebaseService) {}

  

  onSubmit(): void {
    const payment: IPayments = this.paymentsForm.getRawValue();
    payment.date = Date.now()
    this.storeService.addPayment(payment);
    alert('Thanks!');
  }
}
