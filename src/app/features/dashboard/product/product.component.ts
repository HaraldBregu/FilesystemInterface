import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Store } from '@ngrx/store';
import { dashboardDataSelector } from '../store/selectors';
import { getCategories, selectCatalog, selectCategory } from '../store';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductType } from 'src/app/shared/enums/product-type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  catalogSubscription$: Observable<Product | undefined> = new Observable()
  selectedProductSubscription$: Observable<Product | undefined> = new Observable()
  items$: Observable<Product[]> = new Observable()
  items: Product[] = []
  navitems: Product[] = []
  currentCatalog: Product | undefined
  isTableList: boolean = true

  constructor(private store: Store) {
    const dashboardObservable$ = this.store.select(dashboardDataSelector);

    dashboardObservable$
      .pipe(map(data => data.navItems))
      .subscribe(product => this.navitems = product)

    this.items$ = dashboardObservable$.pipe(map(data => data.products))
    this.items$.subscribe(product => this.items = product)

    this.catalogSubscription$ = dashboardObservable$.pipe(map(data => data.currentCatalog))
    this.catalogSubscription$.subscribe(catalog => this.currentCatalog = catalog)

    this.selectedProductSubscription$ = dashboardObservable$.pipe(map(data => data.navItems.at(-1)))

  }

  selectBreadcrumbItem(item: Product) {
    switch (item.type) {
      case ProductType.Catalog:
        this.store.dispatch(selectCatalog({ catalog: item }))
        this.store.dispatch(getCategories({ catalog: item }))
        break
      case ProductType.Category:
        if (this.currentCatalog == null)
          return
        this.store.dispatch(selectCategory({ category: item }));
        this.store.dispatch(getCategories({
          catalog: this.currentCatalog,
          category: item,
        }))
        break
      case ProductType.File:
    }
  }

  selectItem(item: Product) {
    if (this.currentCatalog == null)
      return
    switch (item.type) {
      case ProductType.Category:
      case ProductType.CategoryVariant:
        this.store.dispatch(selectCategory({ category: item }));
        this.store.dispatch(getCategories({
          catalog: this.currentCatalog,
          category: item,
        }))
        break
      case ProductType.File:
      case ProductType.FileVariant:

    }
  }

}
