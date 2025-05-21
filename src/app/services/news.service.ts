import { Injectable } from '@angular/core';
import { News } from '../interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

private news: News[] = [ 
  {
    id: 1,
    title: "Khvicha Kvaratskhelia Joins PSG in Record Transfer",
    description: "Khvicha Kvaratskhelia has signed with Paris Saint-Germain until 2029, becoming the first Georgian to play for the club. He debuted with an assist and scored his first goal in a 4–1 win over Monaco.",
    imageUrl: 'https://images.supersport.com/media/slmamlo4/khvicha-kvaratskhelia-debuts-250125g-1200.jpg',
    date: new Date('2025-01-17'),
    category: 'Breaking News'
  },
  {
    id: 2,
    title: "Florian Wirtz Transfer Saga Intensifies",
    description: "Bayern prepares €100M bid for Wirtz; Leverkusen wants €150M. Liverpool and Real Madrid are also interested.",
    imageUrl: "https://static.footballtransfers.com/images/cn/image/upload/q_75,w_1200/footballcritic/xnzt8hvzm8vjv23qqvwi.webp",
    date: new Date("2025-05-15"),
    category: "Transfer News"
  },
  {
    id: 3,
    title: "Marc Guehi’s Passport Strategy Boosts La Liga Prospects",
    description: "Marc Guehi renews his Ivorian passport to bypass La Liga’s non-EU rules. Real Madrid and Barça are keen.",
    imageUrl: "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/de08/live/4a5c6cc0-2c7d-11ef-b9c6-9f812c59f3ec.jpg",
    date: new Date("2025-05-14"),
    category: "Transfer Strategy"
  },
  {
    id: 4,
    title: "Dean Huijsen Signs for Real Madrid",
    description: "Dean Huijsen joins Real Madrid in a £50M deal from Bournemouth, adding depth to their defense.",
    imageUrl: "https://talksport.com/wp-content/uploads/sites/5/2025/03/dean-huijsen-bournemouth-looks-emirates-980620610.jpg?strip=all&quality=100&w=1620&h=1080&crop=1",
    date: new Date("2025-05-12"),
    category: "Transfers"
  },
  {
    id: 5,
    title: "Arteta Eyes Striker Signing for Arsenal",
    description: "Arsenal targets Šeško, Gyökeres, and Isak as Arteta seeks firepower this summer.",
    imageUrl: "https://sc0.blr1.cdn.digitaloceanspaces.com/article/144458-vspknjvltg-1594872961.jpg",
    date: new Date("2025-05-10"),
    category: "Transfer News"
  },
  {
    id: 6,
    title: "Callum Wilson Set for Leeds Switch",
    description: "Callum Wilson expected to join Leeds United on a free transfer after injury-hit season.",
    imageUrl: "https://e0.365dm.com/20/09/2048x1152/skysports-callum-wilson-newcastle-united_5089625.jpg?20200907124253",
    date: new Date("2025-05-09"),
    category: "Transfer Rumors"
  },
  {
    id: 7,
    title: "Newcastle Lifts EFL Cup After 70 Years",
    description: "Newcastle beat Liverpool 2–1 to win the 2025 EFL Cup — their first major trophy in decades.",
    imageUrl: "https://images.ctfassets.net/9ec6988xevcz/1CS74F4kZjJhOqbOPrfMqX/06cc9d1389b50aa3173de2b24a456c81/TEAM_Men.jpg?fm=webp&fit=fill&f=top",
    date: new Date("2025-03-16"),
    category: "Match Result"
  }
];



  constructor() { }


  getNews(): News[] {
    return this.news;
  }
}
