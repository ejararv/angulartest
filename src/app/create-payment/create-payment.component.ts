import { Component, OnInit } from '@angular/core';
import { IPayments } from '../paymentslist/paymentslist.component';
import { FirebaseService } from '../srvices/firebase.service';

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.css']
})
export class CreatePaymentComponent implements OnInit {

  payments:any = []
  vat:number = 0
  netto:number =0
  position: string =''
  contractor: string =''
  description: string =''

  constructor(private storeService: FirebaseService) { }

  ngOnInit(): void {
  }
  addPayment() {

    const payment:IPayments = {
      id : Date.now(),
      netto: this.netto,
      vat: this.vat,
      position: this.position,
      contractor: this.contractor,
      description: this.description
    }

    this.storeService.addPayment(payment)
  }

}
