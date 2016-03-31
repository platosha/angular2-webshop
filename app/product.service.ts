import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Product} from './product';

@Injectable()
export class ProductService {

  private _apiUrl = '/api/products';

  constructor(
    private http: Http
  ) {}

  getProducts() {
    return this.http
      .get(this._apiUrl)
      .map(res => <Product[]> res.json())
      .catch(this.handleError);
  }

  getProduct(id: number) {
    return this.http
      .get(`${this._apiUrl}/${id}`)
      .map(res => <Product> res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
