import { Injectable } from '@angular/core';
import { Tips } from '../interfaces/tips';
import { Leagues } from '../interfaces/leagues';

@Injectable({
  providedIn: 'root'
})
export class TipsService {

  private leagues:Leagues[]=[
    {
      id:1,
      name:'Uefa Champions League',
      imgUrl:'https://brandlogos.net/wp-content/uploads/2013/06/uefa-champions-league-eps-vector-logo-400x400.png',
    },
    {
      id:2,
      name:'FIFA World Cup',
      imgUrl:'https://static.thenounproject.com/png/30304-200.png',
    },
    {
      id:3,
      name:'Premier League',
      imgUrl:'https://cdn.freebiesupply.com/images/large/2x/premier-league-logo-black-and-white.png',
    },
    {
      id:4,
      name:'La Liga',
      imgUrl:'https://assets.laliga.com/assets/logos/LL_RGB_h_monocromo_positivo/LL_RGB_h_monocromo_positivo.png',
    },
    {
      id:5,
      name:'Serie A',
      imgUrl:'https://static.vecteezy.com/system/resources/previews/010/994/455/non_2x/serie-a-symbol-logo-black-design-italy-football-european-countries-football-teams-illustration-with-white-background-free-vector.jpg',
    },
    {
      id:6,
      name:'Bundesliga',
      imgUrl:'https://static.vecteezy.com/system/resources/previews/010/994/312/non_2x/bundesliga-logo-symbol-white-design-germany-football-european-countries-football-teams-illustration-with-black-background-free-vector.jpg',
    },
    {
      id:7,
      name:'League 1',
      imgUrl:'https://upload.wikimedia.org/wikipedia/commons/a/a0/Ligue_1_2024_Logo.png',
    },
  ]

  constructor() { }

  getLeagues(): Leagues[] {
    return this.leagues;
  }
}
