import {Component, Input, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Product} from './product';
import {ProductService} from './product.service';

@Component({
  selector: 'ws-product-detail',
  template: `
    <section *ngIf="product" class="product">
      <header>
        <h2>{{product.name}}</h2>
        <p>
          <strong class="price">{{product.price}}&nbsp;€</strong>
        </p>
      </header>
      <figure>
        <img src="https://unsplash.it/960/540/?image={{product.id}}" alt="Photo of {{product.name}}" width="960">
      </figure>
    </section>
  `
})
export class ProductDetailComponent implements OnInit {

  @Input()
  product: Product;

  constructor(
    private _productService: ProductService,
    private _routeParams: RouteParams
  ) { }

  ngOnInit() {
    let id = parseInt(this._routeParams.get('id'));
    this._productService
      .getProduct(id)
      .subscribe(product => this.product = product);
  }

}
