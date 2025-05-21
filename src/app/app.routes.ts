import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { NewsComponent } from './pages/news/news.component';
import { TipsComponent } from './pages/tips/tips.component';

export const routes: Routes = [
    {path:'',component:MainComponent},
    {path:'news',component:NewsComponent},
    {path:'tips',component:TipsComponent},
];
