import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TagCloudModule } from 'angular-tag-cloud-module';

import { WordCloudComponent } from './word-cloud.component';
import { TopWordsService } from '../top-words/top-words.service';

describe('WordCloudComponent', () => {
  let component: WordCloudComponent;
  let fixture: ComponentFixture<WordCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordCloudComponent ],
      imports: [ TagCloudModule ],
      providers: [ TopWordsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCloudComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('topWords should be set when component is created', () => {
    expect(component.topWords).toBeUndefined();
    fixture.detectChanges();
    expect(component.topWords).toBeDefined();
  });

});
