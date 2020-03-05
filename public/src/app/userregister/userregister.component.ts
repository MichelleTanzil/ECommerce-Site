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
    this.registerErrors = { errors: "" };
    this.newUser = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      _csrf: ""
    };
  }

  ngOnInit() {
    this.csrftoken();
  }
  csrftoken() {
    let observable = this._httpService.getcsrfToken();
    observable.subscribe((data: object) => {
      console.log("Got our csrf data!", data);
      this.csrfToken = data["csrfToken"];
      //@ts-ignore
      this.newUser._csrf = this.csrfToken;
    });
  }
  submitNewUser() {
    console.log("Entered the submitNewUser function outside");
    let obs = this._httpService.register(this.newUser);
    obs.subscribe((data: any) => {
      console.log("Entered the submitNewUser function inside");
      console.log("data:", data);
      if (data.hasOwnProperty("errors")) {
        console.log("data:", data);
        this.registerErrors = data;
      } else {
        this.router.navigate(["/profile"]);
      }
    });
    console.log("submitted")
  }
}
