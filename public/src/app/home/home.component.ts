import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  games: [];

  slideIndex = 1;
  count = 0;

  allGames = [];
  constructor(private _httpService: HttpService, private router: Router) {}

  ngOnInit() {
    this.getAllGames();
    this.test();
  }

  getAllGames() {
    let observable = this._httpService.getAll();
    observable.subscribe((data: object) => {
      console.log("Got our games data!", data);
      this.games = data["items"];
    });
  }
  //Carousel
  plusSlides(n) {
    console.log("n value: ", n);

    this.slideIndex += n;

    console.log("slideindex value: ", this.slideIndex);
    // if (this.slideIndex < 1) {
    //   this.slideIndex = 3;
    // }
    if (this.slideIndex > 3) {
      this.slideIndex = 1;
    }

    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      this.slideIndex = n;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      // @ts-ignore
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    // @ts-ignore
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
    // showSlides(this.slideIndex += n);
  }

  test() {
    var slideIndex = 1;
    showSlides(slideIndex);

    function currentSlide(n) {
      showSlides((slideIndex = n));
    }
    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        // this is how you tell typescript to ignore/shutup the errors
        // @ts-ignore
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      // @ts-ignore
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }

    var slideIndex = 0;
    showSlidesOne();

    function showSlidesOne() {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      for (i = 0; i < slides.length; i++) {
        // @ts-ignore
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      // @ts-ignore
      slides[slideIndex - 1].style.display = "block";

      dots[slideIndex - 1].className += " active";
      setTimeout(showSlidesOne, 9000);
    }
  }
}
