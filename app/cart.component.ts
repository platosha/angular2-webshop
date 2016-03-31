import {Component, Input} from 'angular2/core';
import {Router} from 'angular2/router';
import {CartService} from './cart.service';
import {CartItem} from './cart-item';
import {Product} from './product';

@Component({
  selector: 'ws-cart',
  template: `
    <section *ngIf="isNotEmpty()">
      <h2>Shopping Cart</h2>
      <div class="table-responsive">
        <table>
          <tr>
            <th>Product name</th>
            <th align="right">Price</th>
            <th align="right">Qty</th>
            <th align="right">Cost</th>
          </tr>
          <tr *ngFor="#cartItem of getCartItems()">
            <td>{{cartItem.product.name}}</td>
            <td align="right">{{cartItem.product.price}}</td>
            <td align="right">{{cartItem.qty}}</td>
            <td align="right">{{cartItem.getCost()}}</td>
          </tr>
          <tr>
            <th colspan="2" align="right">Total:</th>
            <td align="right">{{getTotalQty()}}</td>
            <td align="right">{{getTotalCost()}}</td>
          </tr>
        </table>
      </div>
      <div class="buttons">
        <button (click)="clearCart()">Clear cart</button>
        <button class="default" (click)="checkout()">Checkout</button>
      </div>
    </section>
    <section *ngIf="!isNotEmpty()">
      <h2>Your shopping cart is empty</h2>
    </section>
  `
})
export class CartComponent {

  constructor(
    private _cartService: CartService
  ) {}

  private getCartItems() {
    return this._cartService.items;
  }

  private getTotalQty() {
    return this._cartService.getTotalQty();
  }

  private getTotalCost() {
    return this._cartService.getTotalCost();
  }

  private isNotEmpty() {
    return this._cartService.isNotEmpty();
  }

  clearCart() {
    this._cartService.clearCart();
  }

  checkout() {
    window.alert('Not implemented');
  }

}
