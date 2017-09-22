import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from 'angular-4-data-table';
import { RouterModule } from '@angular/router';
import { AdminAuthGuard } from 'app/admin/services/admin-auth-guard.service';
import { AuthGuard } from '../shared/services/auth-guard.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'admin/products/new',
        component:ProductFormComponent,
        canActivate: [AuthGuard,AdminAuthGuard]
      },
      {
        path:'admin/products/:id',
        component:ProductFormComponent,
        canActivate: [AuthGuard,AdminAuthGuard]
      },
      {
        path:'admin/products',
        component:AdminProductsComponent,
        canActivate: [AuthGuard,AdminAuthGuard]
      },
      {
        path: 'admin/orders', 
        component: AdminOrdersComponent,
        canActivate: [AuthGuard,AdminAuthGuard]
      }
    ])


  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ],
  providers:[
    AdminAuthGuard
  ]
})
export class AdminModule { }
