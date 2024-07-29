import { Component } from '@angular/core';
import { ProductOrderComponent } from './product-order/product-order.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ProductOrderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'product-order-list';

  someMethod() {
    // console.log('someMethod called');
  }

  someAction() {
    this.someMethod();
  }
}
