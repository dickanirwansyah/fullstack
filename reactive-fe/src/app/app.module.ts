import { AddCatalogComponent } from './add-catalog/add-catalog.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/catagory.component';
import { CatalogComponent } from './catalog/catalog.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './shared/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { AddProductsComponent } from './products/add-products/add-products.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogComponent,
    CategoryComponent,
    CartComponent,
    AddCategoryComponent,
    AddCatalogComponent,
    ListProductsComponent,
    AddProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
