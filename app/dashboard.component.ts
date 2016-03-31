import {Component, OnInit} from 'angular2/core';
import {Product} from './product';
import {ProductComponent} from './product.component';
import {ProductService} from './product.service';

@Component({
  selector: 'ws-dashboard',
  templateUrl: 'app/dashboard.component.html',
  directives: [
    ProductComponent
  ]
})
export class DashboardComponent implements OnInit {

  topProducts: Product[] = [];

  constructor(
    private _productService: ProductService
  ) {}

  ngOnInit() {
    this._productService
      .getProducts()
      .subscribe(
        products => this.topProducts = products.slice(0, 4)
      );
  }

}
