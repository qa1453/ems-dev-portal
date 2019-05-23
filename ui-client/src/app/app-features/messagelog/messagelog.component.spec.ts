import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { MessagelogComponent } from './messagelog.component';

describe('MessagelogComponent', () => {
  let component: MessagelogComponent;
  let fixture: ComponentFixture<MessagelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagelogComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
