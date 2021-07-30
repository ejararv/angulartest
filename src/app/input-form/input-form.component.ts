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
    
  //  { 
  //   netto:null,
  //   position: [null, Validators.required],
  //   contractor: [null, Validators.required],
  //   description: null,
  //   vat: [null, Validators.required],
  //   // postalCode: [
  //   //   null,
  //   //   Validators.compose([
  //   //     Validators.required,
  //   //     Validators.minLength(5),
  //   //     Validators.maxLength(5),
  //   //   ]),
  //   // ],
  //   }
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
    }
    this.storeService.addPayment(payment)
  }
    
  

   
  
  onSubmit(): void {
    
    this.addPayment()
    alert('Thanks!');
  }

  
}
