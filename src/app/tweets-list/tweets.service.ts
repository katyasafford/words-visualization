import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class TweetsService {
  //private getTweetsEndpoint = 'https://api.twitter.com/1.1/search/tweets.json';
  constructor(private http: HttpClient) {}

  public getTweetsByHashtag(hashtag: string, limit: number, resultType: string) {
    // // let endpoint = 'https://api.twitter.com/1.1/search/tweets.json?q=%23superbowl&amp;result_type=recent&amp;count=100'
    // let endpoint = 'https://api.twitter.com/1.1/search/tweets.json?q=%23'+ hashtag + '&amp;result_type=' + resultType + '&amp;count=' + limit;
    //
    // /** TODO: store bearer in env variable */
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', 'Bearer ' + 'AAAAAAAAAAAAAAAAAAAAAPFh9AAAAAAAj5qgDXiqZp4pJ7Xyd%2FCvi2Ade0U%3D1VsjOJuNmB6aNn06SPpHK1ECS82AF7fbOqFAQUn1ME5qiuu0zp');
    //
    // return this.http.get(endpoint, { headers: headers });
    return this.http.get("./assets/tweets.json")

  }

  // user() {
  //   return this.http.get(`${environment.api}/user`);
  // }



}
