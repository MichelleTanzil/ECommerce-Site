import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-userregister",
  templateUrl: "./userregister.component.html",
  styleUrls: ["./userregister.component.css"]
})
export class UserregisterComponent implements OnInit {
  newUser = {};
  csrfToken: {};
  registerErrors: {};
  mongoError: string;

  constructor(private _httpService: HttpService, private router: Router) {
    this.newUser = { firstName: "", lastName: "", email: "", password: "" };
    this.registerErrors = { errors: "" };
  }

  ngOnInit() {
    this.csrftoken();
  }
  csrftoken() {
    let observable = this._httpService.getcsrfToken();
    observable.subscribe((data: object) => {
      console.log("Got our cart data!", data);
      this.csrfToken = data["csrfToken"];
    });
  }
  submitNewUser() {
    let obs = this._httpService.register(this.newUser);
    obs.subscribe((data: any) => {
      if (data.hasOwnProperty("errors")) {
        console.log(data);
        this.registerErrors = data;
      } else if (data.name == "MongoError") {
        this.mongoError = "The resturant name must be unique";
      } else {
        this.router.navigate(["/profile"]);
      }
    });
  }
}
