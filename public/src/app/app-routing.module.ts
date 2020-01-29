import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { HomeComponent } from "./home/home.component";
import { ProductviewComponent } from "./productview/productview.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: "cart", component: CartComponent },
  { path: "game/:id", component: ProductviewComponent},
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
