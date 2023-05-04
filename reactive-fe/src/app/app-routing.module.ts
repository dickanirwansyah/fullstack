import { AddCatalogComponent } from './add-catalog/add-catalog.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CategoryComponent } from './category/catagory.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { AddProductsComponent } from './products/add-products/add-products.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'add-category/:id',
    component: AddCategoryComponent
  },
  {
    path: 'catalog',
    component: CatalogComponent
  },
  {
    path: 'add-catalog/:id',
    component: AddCatalogComponent
  },
  {
    path: 'product',
    component: ListProductsComponent
  },
  {
    path: 'add-products/:id',
    component: AddProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
