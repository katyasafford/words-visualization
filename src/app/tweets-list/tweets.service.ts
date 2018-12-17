import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TweetsService {

  constructor(private http: HttpClient) {}

  public getTweetsByHashtag() {
    return this.http.get("./assets/tweets.json");
  }

}
