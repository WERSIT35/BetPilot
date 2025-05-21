import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Splide from '@splidejs/splide';
import { News } from '../../interfaces/news';
import { NewsService } from '../../services/news.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-news-slider',
  imports: [RouterLink],
  templateUrl: './news-slider.component.html',
  styleUrl: './news-slider.component.scss'
})
export class NewsSliderComponent implements OnInit , AfterViewInit{
  newsList:News[]=[];

  ngOnInit(): void {
      this.newsList = this.newsService.getNews();
  }

  ngAfterViewInit(): void {
    const splide = new Splide('.splide', {
      type: 'loop',
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 5000,
      pauseOnHover: false,
      pauseOnFocus: false,
      perPage: 1,
    });

    splide.mount();
  }
  constructor(
    private newsService:NewsService
  ) {}
}
