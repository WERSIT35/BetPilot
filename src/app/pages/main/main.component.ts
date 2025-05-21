import { Component } from '@angular/core';
import { NewsSliderComponent } from '../../components/news-slider/news-slider.component';

@Component({
  selector: 'app-main',
  imports: [NewsSliderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
