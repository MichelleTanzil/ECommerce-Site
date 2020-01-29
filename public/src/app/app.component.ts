import { Component } from "@angular/core";
import { HttpService } from "./http.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "public";
  cart: {};

  constructor(private _httpService: HttpService, private router: Router) {
    this.cart = { items: "", totalQty: "", totalPrice:gi ""};
  }

  ngOninit() {
    this.getCart();
  }

  getCart() {
    let observable = this._httpService.getCart();
    observable.subscribe((data: object) => {
      console.log("Got our data!", data);
      this.cart = data;
    });
  }
}
