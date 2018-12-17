import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TopWordsService {

    public topWords: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    public broadcast(value): void {
        this.topWords.next(value);
    }

}
