import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { HomeComponent } from "./home/home.component";
import { ProductviewComponent } from "./productview/productview.component";
import { UserloginComponent } from "./userlogin/userlogin.component";
import { UserregisterComponent } from "./userregister/userregister.component";
import { UserprofileComponent } from "./userprofile/userprofile.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: "login", component: UserloginComponent },
  { path: "register", component: UserregisterComponent },
  { path: "profile", component: UserprofileComponent },
  { path: "cart", component: CartComponent },
  { path: "game/:id", component: ProductviewComponent },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
