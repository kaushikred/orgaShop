import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Order } from '../../../shared/models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy { 
  shipping = {}; 
  cart:ShoppingCart;
  cartSubscription:Subscription;
  userSubscription:Subscription;

  userId:string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService:OrderService,
    private cartService:ShoppingCartService) {}

  async ngOnInit(){
    let cart$ = await this.cartService.getCart();
    this.cartSubscription= cart$.subscribe(x=>{
      this.cart = x;
    })
    this.userSubscription=this.authService.user$.subscribe(user=>{
      this.userId = user.uid;
    })
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    console.log('here')
    let order = new Order(this.userId,this.shipping,this.cart)
    
    let result = await this.orderService.placeOrder(order)
    this.router.navigate(['/order-success',result.key])
  }    
}
 