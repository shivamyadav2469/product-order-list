import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TextToSpeechService } from '../text-to-speech.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {
  orderForm: FormGroup;
  products = ['Pencil', 'Eraser', 'Pens'];
  quantities = [0, 1, 2, 3, 4, 5];
  order: Array<{ product: string; quantity: number }> = [];
  showOrderList: boolean = false;
  isLoading: boolean = false;

  @ViewChild('orderModal') orderModal!: TemplateRef<any>;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private ttsService: TextToSpeechService) {
    this.orderForm = this.fb.group({
      products: this.fb.array([this.createProductFormGroup()])
    });
  }

  ngOnInit(): void {}

  get productControls() {
    return (this.orderForm.get('products') as FormArray).controls;
  }

  createProductFormGroup(): FormGroup {
    return this.fb.group({
      product: ['', Validators.required],
      quantity: [0, Validators.required]
    });
  }

  addProduct(index: number): void {
    if (index === this.productControls.length - 1 && this.productControls.length < 8) {
      (this.orderForm.get('products') as FormArray).push(this.createProductFormGroup());
    } else {
      alert("Cannot add more than 8 products");
    }
  }

  showOrder(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.order = this.orderForm.value.products
        .filter((p: { product: string; quantity: number }) => p.product && p.quantity !== null && p.quantity !== undefined)
        .map((p: { product: string; quantity: number }) => ({
          product: p.product,
          quantity: p.quantity
        }));

      this.showOrderList = true;
      this.dialog.open(this.orderModal);
      this.isLoading = false;
    }, 1000);
  }

  readOrder(): void {
    if (this.order.length > 0) {
      const orderText = this.order.map(item => `${item.product}: ${item.quantity}`).join(', ');
      console.log('Order Text:', orderText); 
      this.ttsService.speak(orderText)
        .catch(error => console.error('Error reading order:', error));
    } else {
      console.error('No order to read');
    }
  }

  onProductChange(event: any, index: number): void {}

  onQuantityChange(event: any, index: number): void {}
}
