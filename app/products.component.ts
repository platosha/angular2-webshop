import {Component, OnInit} from 'angular2/core';
import {Product} from './product';
import {ProductComponent} from './product.component';
import {ProductService} from './product.service';

@Component({
  selector: 'ws-products',
  template: `
    <section class="products">
      <h2>All Products</h2>
      <ws-product *ngFor="#product of products" [product]="product" class="products__item"></ws-product>
    </section>
  `,
  directives: [
    ProductComponent
  ]
})

export class ProductsComponent implements OnInit {

  public products: Product[];
  public selectedProduct: Product;

  constructor(
    private _productService: ProductService
  ) { }

  getProducts() {
    this._productService
      .getProducts()
      .subscribe(products => this.products = products);
  }

  ngOnInit() {
    this.getProducts();
  }

}
