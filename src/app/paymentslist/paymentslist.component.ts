import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../srvices/firebase.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export interface IPayments {
  id: number;
  netto: number;
  vat: number;
  position: string;
  contractor: string;
  description?: string;
}

const DATA_SET_example :IPayments [] = [
 { id: Date.now(),
  netto: 2000,
  vat: 24,
  position: "DATA TEST",
  contractor: "Coment",
  description: "Desc"}
]


@Component({
  selector: 'app-paymentslist',
  templateUrl: './paymentslist.component.html',
  styleUrls: ['./paymentslist.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})



export class PaymentslistComponent implements OnInit {
 

  

  payments: any = [];
  DATA_SET: any = []
  data =   this.payments;

  displayedColumns = ['description', 'position', 'contractor', 'vat', 'netto'];
  vat: number = 0;
  netto: number = 0;
  position: string = '';
  contractor: string = '';
  description: string = '';

  

  dataSource = new MatTableDataSource<IPayments>(this.payments && DATA_SET_example)

  constructor( private storeService: FirebaseService ) {}

  
  getData () {
    
    let data = this.storeService.getPayments().subscribe((firebaseItems) => {
      this.payments = [];
      
      firebaseItems.forEach((items) => {
        let item: any = items.payload.doc.data();
        item.id = items.payload.doc.id;
        this.payments.push(item);
        this.dataSource = new MatTableDataSource(this.payments)
        this.dataSource.data = this.payments
        
      });
    });
  }

  ngOnInit() {
   
    this.getData()

  
    console.log(this.DATA_SET)
    
  }

  addPayment() {
    const payment: IPayments = {
      id: Date.now(),
      netto: this.netto,
      vat: this.vat,
      position: this.position,
      contractor: this.contractor,
      description: this.description,
    };

    this.storeService.addPayment(payment);
  }

  updatePayment(item: any) {
    const payment: IPayments = {
      id: Date.now(),
      netto: this.netto,
      vat: this.vat,
      position: this.position,
      contractor: this.contractor,
      description: this.description,
    };

    this.storeService.updatePayment(item.id, {
      id: Date.now(),
      netto: this.netto,
      vat: this.vat,
      position: this.position,
      contractor: this.contractor,
      description: this.description,
    });
  }

  deletePayment(item: any) {
    this.storeService.deletePayment(item.id);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
