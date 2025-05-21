export interface Tips {
    id: number;
  matchDate: Date;
  league: string;
  homeTeam: string;
  awayTeam: string;
  tip: string; 
  confidence?: number;
  analysis?: string;  

}
