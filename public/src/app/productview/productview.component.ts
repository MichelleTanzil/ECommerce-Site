import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-productview",
  templateUrl: "./productview.component.html",
  styleUrls: ["./productview.component.css"]
})
export class ProductviewComponent implements OnInit {
  constructor(
    private _httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  id: string;
  oneGame: {};
  addToCartGame: {};


  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.addToCartGame = { console: "", editionId: "" };
    this.oneGame = {};
    this.getGame();
  }

  getGame() {
    let observable = this._httpService.getOne(this.id);
    observable.subscribe((data: object) => {
      console.log("Got our one game!", data);
      this.oneGame = data;
    });
  }
  addToCart() {
    console.log(this.addToCartGame);
    let observable = this._httpService.addToCart(this.id, this.addToCartGame);
    observable.subscribe((data: object) => {
      console.log("Added to Cart", data);
      this.router.navigate(["/"]);
    });
  }
}
