import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) {
  }

  getRepositoryData(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.gitHubToken}`,
      'Content-Type': 'application/json',
    });

    const body = {
      query: `
       query {
          viewer {
            repositories(first: 5) {
              nodes {
                name
                description
                url
                stargazerCount
                isPrivate
                forkCount
                diskUsage
                primaryLanguage {
                  name
                }
              }
            }
          }
        }
      `,
    };

    return this.http.post<any>(environment.gitHubAPI, body, { headers });
  }
}
