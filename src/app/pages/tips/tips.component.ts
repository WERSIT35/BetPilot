import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootballApiService } from '../../services/football-api.service';
import { TipsService } from '../../services/tips.service';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {
  leagues: any[] = [];
  selectedLeagueId: string = 'PL'; // default to Premier League

  matches: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  private cooldown: boolean = false;
  private splide?: Splide;

  // Map league names to competition IDs for API calls:
  public leagueIdMap: { [key: string]: string } = {
    'Premier League': 'PL',
    'Uefa Champions League': 'CL',
    'FIFA World Cup': 'WC',
    'La Liga': 'PD',
    'Serie A': 'SA',
    'Bundesliga': 'BL1',
    'League 1': 'FL1',
  };

  // New: map teamId to team data (including crest)
  teamMap: { [teamId: number]: any } = {};

  constructor(
    private footballService: FootballApiService,
    private tipsService: TipsService
  ) {}

  ngOnInit(): void {
    this.leagues = this.tipsService.getLeagues().filter(l => this.leagueIdMap[l.name]);
    this.selectedLeagueId = this.leagueIdMap['Premier League']; // default
    this.loadData(this.selectedLeagueId);
  }

  ngAfterViewInit(): void {
    this.splide = new Splide('.splide-tips', {
      type: 'slide',
      arrows: false,
      pagination: false,
      pauseOnHover: false,
      pauseOnFocus: false,
      perPage: 5,
      breakpoints: {
        768: {
          perPage: 3,
        },
      },
    });

    this.splide.mount();
  }

  onLeagueClick(leagueName: string): void {
    const competitionId = this.leagueIdMap[leagueName];
    if (!competitionId || this.loading || this.selectedLeagueId === competitionId) return;

    this.selectedLeagueId = competitionId;
    this.loadData(competitionId);
  }

  // New combined method: load matches + teams
  loadData(competitionId: string): void {
    if (this.cooldown) {
      this.error = 'Please wait before making more requests.';
      return;
    }

    this.loading = true;
    this.error = null;
    this.matches = [];
    this.teamMap = {};  // reset team map

    const today = new Date();
    const dateTo = new Date(today);
    dateTo.setDate(today.getDate() + 30);

    const dateFromStr = this.formatDate(today);
    const dateToStr = this.formatDate(dateTo);

    // Fetch matches
    this.footballService.getCompetitionMatches(competitionId, {
      dateFrom: dateFromStr,
      dateTo: dateToStr,
    }).subscribe({
      next: (data) => {
        const validStatuses = ['SCHEDULED', 'TIMED'];
        this.matches = (data?.matches ?? []).filter((m: { status: string }) => validStatuses.includes(m.status));

        if (this.matches.length === 0) {
          this.error = 'No upcoming matches found in the next 30 days.';
        }

        // After loading matches, fetch teams for this competition
        this.footballService.getCompetitionTeams(competitionId).subscribe({
          next: (teamData) => {
            // Build map teamId => team
            for (const team of teamData.teams ?? []) {
              this.teamMap[team.id] = team;
            }
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
            this.error = 'Failed to load team info.';
            console.error('API Error (teams):', err);
          }
        });
      },
      error: (err) => {
        this.loading = false;
        if (err.message.includes('request limit') || err.message.includes('429')) {
          this.error = 'Request limit reached. Please wait 30 seconds.';
          this.cooldown = true;
          setTimeout(() => {
            this.cooldown = false;
            this.error = null;
          }, 30000);
        } else {
          this.error = 'Failed to load matches. Please try again later.';
        }
        console.error('API Error (matches):', err);
      }
    });
  }

  getLeagueNameFromId(leagueId: string): string {
    for (const name in this.leagueIdMap) {
      if (this.leagueIdMap[name] === leagueId) return name;
    }
    return leagueId;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // New helper for getting crest image URL for a team id
  getTeamLogo(teamId: number): string {
    return this.teamMap[teamId]?.crest || 'assets/default-team-logo.png';
  }
  onImgError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = 'assets/default-team-logo.png'; // fallback image path
}

}
