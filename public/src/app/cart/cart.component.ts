import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  cart: {};
  constructor(private _httpService: HttpService, private router: Router) {
    this.cart = { items: "", totalQty: "", totalPrice: "" };
  }

  ngOnInit() {
    this.getCart();
  }
  getCart() {
    let observable = this._httpService.getCart();
    observable.subscribe((data: object) => {
      console.log("Got our cart data!", data);
      this.cart = data;
    });
  }
}
