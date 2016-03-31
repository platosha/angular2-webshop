import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ProductService} from './product.service';
import {CartService} from './cart.service';
import {DashboardComponent} from './dashboard.component';
import {ProductsComponent} from './products.component';
import {ProductDetailComponent} from './product-detail.component';
import {CartComponent} from './cart.component';

@Component({
  selector: 'ws-app',
  template: `
    <div class="navbar">
      <h1>{{title}}</h1>
      <nav>
        <a [routerLink]="['Dashboard']">Dashboard</a>
        <a [routerLink]="['Products']">Products</a>
        <a [routerLink]="['Cart']" class="block-link">
          <span class="block-link__text">Cart</span>
          <span *ngIf="cartIsNotEmpty()">
            ({{getCartTotalQty()}} items, {{getCartTotalCost()}} €)
          </span>
        </a>
      </nav>
    </div>
    <main>
      <router-outlet></router-outlet>
    </main>
    <div class="footer">
      &copy; {{year}}
    </div>
  `,
  directives: [
    ROUTER_DIRECTIVES
  ],
  providers: [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    ProductService,
    CartService
  ]
})
@RouteConfig([
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsComponent
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetailComponent
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartComponent
  }
])
export class AppComponent {

  title = 'A2 Web Shop';
  year = (new Date()).getFullYear();

  constructor(
    private _cartService: CartService
  ) {}

  cartIsNotEmpty() {
    return this._cartService.isNotEmpty();
  }

  getCartTotalQty() {
    return this._cartService.getTotalQty();
  }

  getCartTotalCost() {
    return this._cartService.getTotalCost();
  }

}
