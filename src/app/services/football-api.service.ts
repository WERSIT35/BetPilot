import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballApiService {
  private baseUrl = '/api'; // Proxy path to the Football Data API

  constructor(private http: HttpClient) { }

  getCompetition(competitionId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/competitions/${competitionId}`)
      .pipe(catchError(this.handleError));
  }

  getCompetitionMatches(
    competitionId: string,
    filters?: {
      dateFrom?: string;
      dateTo?: string;
      stage?: string;
      status?: string;
      matchday?: number;
      group?: string;
      season?: string;
    }
  ): Observable<any> {
    if (!competitionId) {
      return throwError(() => new Error('Competition ID is required'));
    }

    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (key === 'dateFrom' || key === 'dateTo') {
            params = params.set(key, this.formatDate(value as string | Date));
          } else {
            params = params.set(key, value.toString());
          }
        }
      });
    }

    return this.http.get(`${this.baseUrl}/competitions/${competitionId}/matches`, { params })
      .pipe(catchError(this.handleError));
  }

  // New method to get teams in a competition
  getCompetitionTeams(competitionId: string): Observable<any> {
    if (!competitionId) {
      return throwError(() => new Error('Competition ID is required'));
    }

    return this.http.get(`${this.baseUrl}/competitions/${competitionId}/teams`)
      .pipe(catchError(this.handleError));
  }

  private formatDate(date: string | Date): string {
    if (typeof date === 'string') return date;
    return date.toISOString().split('T')[0];
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Bad request. Please check your parameters.';
          break;
        case 403:
          errorMessage = 'Access forbidden. Check your API token or rate limit.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        default:
          errorMessage = `Server returned code ${error.status}, message: ${error.message}`;
      }
      if (error.error?.message) {
        errorMessage += `\nServer says: ${error.error.message}`;
      }
    }
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
