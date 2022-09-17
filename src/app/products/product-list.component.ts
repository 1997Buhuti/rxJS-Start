import { Component, OnInit, OnDestroy } from "@angular/core";

import {
  catchError,
  combineLatest,
  EMPTY,
  map,
  Observable,
  startWith,
  Subject,
  Subscription,
} from "rxjs";
import { ProductCategory } from "../product-categories/product-category";
import { ProductCategoryService } from "../product-categories/product-category.service";

import { Product } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Product List";
  errorMessage = "";
  categories: ProductCategory[] = [];
  selectedCategoryId = 1;
  private categorySelectedSubject = new Subject<number>();
  categorySelectedActions$ = this.categorySelectedSubject.asObservable();

  products: Product[] = [];
  sub!: Subscription;
  // products$ = this.productService.productsWithCategory$.pipe(
  //   catchError((err) => {
  //     this.errorMessage = err;
  //     return EMPTY;
  //   })
  // );
  products$ = combineLatest([
    this.productService.product$,
    this.categorySelectedActions$.pipe(startWith(0)),
  ]).pipe(
    map(([products, categoryId]) =>
      products.filter((product) =>
        categoryId ? product.categoryId === categoryId : true
      )
    )
  );
  catagories$ = this.productCategoryService.productCategories$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  // productsSimpleFilter$ = this.productService.productsWithCategory$.pipe(
  //   map((products) =>
  //     products.filter((product) =>
  //       this.selectedCategoryId
  //         ? product.categoryId === this.selectedCategoryId
  //         : true
  //     )
  //   )
  // );

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {
    console.log();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onAdd(): void {
    console.log("Not yet implemented");
  }

  onSelected(categoryId: string): void {
    // this.selectedCategoryId = parseInt(categoryId);
    this.categorySelectedSubject.next(+categoryId);
  }
}
