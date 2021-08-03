import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePaymentComponent } from './create-payment/create-payment.component';


import { PaymentslistComponent } from './paymentslist/paymentslist.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreatePaymentComponent,
  },
  {
    path: 'payments',
    component: PaymentslistComponent,
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
