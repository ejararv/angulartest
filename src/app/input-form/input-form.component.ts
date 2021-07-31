import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayments } from '../paymentslist/paymentslist.component';
import { FirebaseService } from '../srvices/firebase.service';

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

  paymentsForm = this.fb.group(
    {
      id: Date.now(),
      netto: this.netto,
      vat: this.vat,
      position: this.position,
      contractor: this.contractor,
      description: this.description,
    }

   
  );

  vatOptions = [
    { name: '23', option: 23 },
    { name: '7', option: 7 },
  ];

  constructor(private fb: FormBuilder, private storeService: FirebaseService) {}

  addPayment() {
    const payment: IPayments = {
      id: Date.now(),
      netto: this.netto,
      vat: this.vat,
      position: this.position,
      contractor: this.contractor,
      description: this.description,
    };
  }

  onSubmit(): void {
    const payment: IPayments = this.paymentsForm.getRawValue();

    this.storeService.addPayment(payment);
    alert('Thanks!');
  }
}
