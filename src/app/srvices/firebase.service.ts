import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
 
  payments:IPayments[] = []
  constructor(
    private firestore: AngularFirestore
  ) { }

  getPayments() {
    return this.firestore.collection('payments').snapshotChanges()
  }

  addPayment(payload: IPayments) {
    return this.firestore.collection('payments').add(payload)
  }

  updatePayment(paymentId: number, payload: IPayments){
    return this.firestore.doc('payments/' + paymentId).update(payload)
  }
  deletePayment(paymentId: number) {
    return this.firestore.doc('payments/' + paymentId).delete()
  }
}

export interface IPayments {
  id : number,
  netto: number,
  vat: number,
  position: string,
  contractor: string,
  description?: string,

}
