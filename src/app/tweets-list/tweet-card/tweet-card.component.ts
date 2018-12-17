import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.css']
})
export class TweetCardComponent implements OnInit {
  @Input() tweetText: string;
  @Input() username: string;
  @Input() userImg: string;

  constructor() { }

  ngOnInit() {
  }

}
