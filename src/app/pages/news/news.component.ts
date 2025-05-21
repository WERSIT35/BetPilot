import { Component } from '@angular/core';
import { NewsSliderComponent } from "../../components/news-slider/news-slider.component";

@Component({
  selector: 'app-news',
  imports: [NewsSliderComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {

}
