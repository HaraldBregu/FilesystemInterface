import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { CatalogService } from "src/app/shared/services/catalog.service";
import { CategoryService } from "src/app/shared/services/category.service";
<<<<<<< HEAD
import { ProductService } from "src/app/shared/services/product.service";
=======
>>>>>>> 86bb3b56a4b768ef27ab52753653571ddee85ca2
import {
    getCatalogs,
    getCatalogsFailure,
    getCatalogsSuccess,
    getCategories,
    getCategoriesFailure,
<<<<<<< HEAD
    getCategoriesSuccess,
    getProductDetail,
    getProductDetailFailure,
    getProductDetailSuccess
=======
    getCategoriesSuccess
>>>>>>> 86bb3b56a4b768ef27ab52753653571ddee85ca2
} from '../actions';

@Injectable()
export class DashboardEffects {

    constructor(
        private actions$: Actions,
        private catalogService: CatalogService,
        private categoryService: CategoryService,
        private productService: ProductService) { }

    catalogList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCatalogs),
            mergeMap(() => this.catalogService.getAll().pipe(
                map(catalogs =>
                    getCatalogsSuccess({ catalogs: catalogs })),
                catchError((error) =>
                    of(getCatalogsFailure({ error: error })))
            ))
        )
    );

    categoryList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCategories),
            mergeMap(({ catalog, category }) => this.categoryService.get(catalog.name, category?.id).pipe(
                map(categories =>
                    getCategoriesSuccess({ categories: categories })),
                catchError((error) =>
                    of(getCategoriesFailure({ error: error })))
            ))
        )
    );
    
    product$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getProductDetail),
            mergeMap(({ catalog, category }) => this.productService.get(catalog.name, category.id).pipe(
                map(response =>
                    getProductDetailSuccess({ product_detail: response })),
                catchError((error) =>
                    of(getProductDetailFailure({ error: error })))
            ))
        )
    );
}
