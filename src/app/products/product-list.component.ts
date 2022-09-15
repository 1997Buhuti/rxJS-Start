import { Component, OnInit, OnDestroy } from '@angular/core';

import { catchError, EMPTY, Observable, Subscription } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Product List";
  errorMessage = "";
  categories: ProductCategory[] = [];

  products: Product[] = [];
  sub!: Subscription;
  products$ = this.productService.product$.pipe(
      catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onAdd(): void {
    console.log("Not yet implemented");
  }

  onSelected(categoryId: string): void {
    console.log("Not yet implemented");
  }
}
