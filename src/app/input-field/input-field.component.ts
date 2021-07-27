import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../srvices/firebase.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';
import { IPayments } from '../srvices/firebase.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  constructor(
    private store: AngularFirestore
  ) { }

  ngOnInit(): void {


  }

  addPayment(payload: IPayments) {
    return this.store.collection('payments').add(payload)
  }

}
