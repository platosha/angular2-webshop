import {Product} from './product';

interface ICartItemSerialized {
  productId: number;
  qty: number;
}

export class CartItem {

  product: Product;
  qty: number = 1;

  constructor(
    product: Product,
    qty?: number
  ) {
    this.product = product;
    if (qty !== undefined) {
      this.qty = qty;
    }
  }

  getCost() {
    return this.product.price * this.qty;
  }

  toJSON() {
    return <ICartItemSerialized> {
      productId: this.product.id,
      qty: this.qty
    };
  }

}
