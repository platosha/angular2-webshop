import {Injectable} from 'angular2/core';
import {Product} from './product';
import {ProductService} from './product.service';
import {CartItem} from './cart-item';

@Injectable()
export class CartService {

  public items: CartItem[] = [];
  private _itemsByProductId: { [id: string]: CartItem } = {};

  private _localStorageKey = 'wsCart';

  constructor(
    private _productService: ProductService
  ) {
    this.loadFromLocalStorage();
  }

  addProduct(product: Product) {
    let item: CartItem = this._itemsByProductId[product.id];
    if (item === undefined) {
      item = new CartItem(product);
      this.items.push(item);
      this._itemsByProductId[product.id] = item;
    } else {
      item.qty++;
    }
    this.saveToLocalStorage();
  }

  clearCart() {
    this.items.splice(0, this.items.length);
    this._itemsByProductId = {};
    this.saveToLocalStorage();
  }

  isNotEmpty() {
    return !!this.items.length;
  }

  getTotalQty() {
    let totalQty = 0;
    this.items.forEach(item => totalQty += item.qty);
    return totalQty;
  }

  getTotalCost() {
    let totalCost = 0;
    this.items.forEach(item => totalCost += item.getCost());
    return totalCost;
  }

  loadFromLocalStorage() {
    let storedItems: string = window.localStorage.getItem(this._localStorageKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems)
        .map(obj => {
          var item = new CartItem(new Product(), obj.qty);
          this._productService
            .getProduct(obj.productId)
            .subscribe(product => {
              item.product = product
              this._itemsByProductId[product.id] = item
            }),
          item.qty = obj.qty;
          return item;
        });
    }
  }

  saveToLocalStorage() {
    window.localStorage.setItem(this._localStorageKey, JSON.stringify(this.items));
  }

}

