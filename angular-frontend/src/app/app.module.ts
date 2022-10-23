import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductsComponent } from './products/products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestComponent } from './test/test.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { HttpClientModule } from '@angular/common/http';
import { MerchantSignUpComponent } from './merchant-sign-up/merchant-sign-up.component';
import { MerchantLoginComponent } from './merchant-login/merchant-login.component';
import { AddProductComponent } from './add-product/add-product.component'
import { JwtModule } from '@auth0/angular-jwt';
import { AdminAuthGuard, MerchantAuthGuard, UserAuthGuard } from 'src/Guard/auth.guard';
import { SearchComponent } from './search/search.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { CartComponent } from './cart/cart.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MerchantApprovalComponent } from './merchant-approval/merchant-approval.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MerchantEditComponent } from './merchant-edit/merchant-edit.component';
import { ManageComponent } from './manage/manage.component';
import { RemoveComponent } from './remove/remove.component';
import { OrdersComponent } from './orders/orders.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    HomePageComponent,
    AboutUsComponent,
    ProductsComponent,
    TestComponent,
    UserLoginComponent,
    UserSignupComponent,
    MerchantSignUpComponent,
    MerchantLoginComponent,
    AddProductComponent,
    SearchComponent,
    ProductCategoriesComponent,
    CartComponent,
    AdminLoginComponent,
    MerchantApprovalComponent,
    ChangePasswordComponent,
    MerchantEditComponent,
    ManageComponent,
    RemoveComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7170"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [MerchantAuthGuard, AdminAuthGuard, UserAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
