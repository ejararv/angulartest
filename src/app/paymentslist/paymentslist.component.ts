import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../srvices/firebase.service';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';

export interface IPayments {
  id : number
  netto: number
  vat: number
  position: string
  contractor: string
  description?: string

}


@Component({
  selector: 'app-paymentslist',
  templateUrl: './paymentslist.component.html',
  styleUrls: ['./paymentslist.component.css']
})




export class PaymentslistComponent implements OnInit {

  
  

  payments:any = []

  dataSource = new MatTableDataSource(this.payments);
  displayedColumns = ['id', 'position', 'contractor', 'vat', 'netto'];
  vat:number = 0
  netto:number =0
  position: string =''
  contractor: string =''
  description: string =''


  constructor(private storeService: FirebaseService) { }

  ngOnInit() {

    this.storeService.getPayments().subscribe(firebaseItems => {
      this.payments = [];
      firebaseItems.forEach(items => {
        let item:any = items.payload.doc.data()
        item.id = items.payload.doc.id
        this.payments.push(item)
        
      })
    })
    // this.storeService
    //   .collection('payments')
    //   .snapshotChanges()
    //   .subscribe((fireBaseItems) => {
    //     this.payments = [];
    //     fireBaseItems.forEach((items) => {
    //       let item:any = items.payload.doc.data();
    //       item.id = items.payload.doc.id;
    //       this.payments.push(item);
    //     });
    //   });
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

  // updatePayment(item: any) {
  //   this.store.doc(`payments/${item.id}`).update({
  //     time: new Date(),
  //   });
  // }

  deletePayment(item: any) {
    this.storeService.deletePayment(item.id)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
