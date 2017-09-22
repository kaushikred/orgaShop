import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Product[]=[];
  cart$:Observable<ShoppingCart>;
  category:string;
  filteredProducts: Product[]=[];
  subscription: Subscription;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) { } 

  async ngOnInit(){
    
    this.cart$ = await this.shoppingCartService.getCart()

    this.populateProducts();

  }

  private populateProducts(){
    this.productService.getAll()
    .switchMap(p=> {
      this.products = p;
      return this.route.queryParamMap
    })
    .subscribe(params=>{
      this.category = params.get('category')
      this.applyFilter()
    })
  }

  private applyFilter(){
    this.filteredProducts = (this.category)? 
    this.products.filter(p => p.category === this.category):
    this.products;
  }

 

}
