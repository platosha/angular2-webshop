import {Component, Input} from 'angular2/core';
import {Router} from 'angular2/router';
import {Product} from './product';
import {CartService} from './cart.service';

@Component({
  selector: 'ws-product',
  template: `
    <a (click)="gotoProduct($event, product)" href="#" class="block-link">
      <section *ngIf="product" class="product">
        <header>
          <h3 class="block-link__text">{{product.name}}</h3>
          <p>
            <strong class="price">{{product.price}}&nbsp;€</strong>
            <button (click)="addToCart($event, product)">Add to cart</button>
          </p>
        </header>
        <figure>
          <img src="https://unsplash.it/222/222/?image={{product.id}}" alt="Photo of {{product.name}}" width="222">
        </figure>
      </section>
    </a>
  `
})
export class ProductComponent {
  @Input()
  product: Product;

  constructor(
    private _router: Router,
    private _cartService: CartService
  ) {}

  gotoProduct(event, product: Product) {
    event.preventDefault();
    this._router.navigate(['ProductDetail', {id: product.id}])
    return false;
  }

  addToCart(event, product: Product) {
    event.preventDefault();
    event.stopPropagation();
    this._cartService.addProduct(product);
  }
}
