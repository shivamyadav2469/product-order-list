import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductOrderComponent } from './product-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('ProductOrderComponent', () => {
  let component: ProductOrderComponent;
  let fixture: ComponentFixture<ProductOrderComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductOrderComponent, // Import the standalone component here
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of({}) })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOrderComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new product group when addProduct is called', () => {
    const initialProductCount = component.productControls.length;
    component.addProduct(0);
    fixture.detectChanges();
    const newProductCount = component.productControls.length;
    expect(newProductCount).toBe(initialProductCount + 1);
  });

  // it('should open the order modal when showOrder is called', () => {
  //   component.showOrder();
  //   expect(dialog.open).toHaveBeenCalled();
  // });
});
