import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard, MerchantAuthGuard, UserAuthGuard } from 'src/Guard/auth.guard';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CartComponent } from './cart/cart.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ManageComponent } from './manage/manage.component';
import { MerchantApprovalComponent } from './merchant-approval/merchant-approval.component';
import { MerchantEditComponent } from './merchant-edit/merchant-edit.component';
import { MerchantLoginComponent } from './merchant-login/merchant-login.component';
import { MerchantSignUpComponent } from './merchant-sign-up/merchant-sign-up.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RemoveComponent } from './remove/remove.component';
import { SearchComponent } from './search/search.component';
import { TestComponent } from './test/test.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';

const routes: Routes = [
  {path:'', component:HomePageComponent},
  {path:'home', component:HomePageComponent},
  {path:'products/open/:productId', component:ProductDetailsComponent, canActivate: [UserAuthGuard]},
  {path:'about-us', component:AboutUsComponent},
  {path:'test', component: TestComponent},
  {path:'login', component: UserLoginComponent},
  {path:'sign-up', component:UserSignupComponent},
  {path:'sign-up/request/merchant-200', component: MerchantSignUpComponent},
  {path:'login/merchant-200', component: MerchantLoginComponent},
  {path:'merchant/add-products', component: AddProductComponent, canActivate: [MerchantAuthGuard]},
  {path:'products/search/:productName', component: SearchComponent},
  {path:'products/categories/:productCategory', component: ProductCategoriesComponent},
  {path:'products/cart', component: CartComponent, canActivate:[UserAuthGuard]},
  {path:'login/400/admin', component:AdminLoginComponent},
  {path:'admin/merchant-approval', component:MerchantApprovalComponent, canActivate: [AdminAuthGuard]},
  {path:'change-password', component: ChangePasswordComponent, canActivate: [UserAuthGuard]},
  {path:'merchant/edit/:productId', component: MerchantEditComponent, canActivate:[MerchantAuthGuard]},
  {path:'manage', component: ManageComponent, canActivate: [MerchantAuthGuard]},
  {path:'admin/remove-users', component:RemoveComponent, canActivate:[AdminAuthGuard]},
  {path:'orders', component: OrdersComponent, canActivate:[UserAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
