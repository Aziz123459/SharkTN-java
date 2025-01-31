import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInFooterComponent } from './logged-in-footer.component';

describe('LoggedInFooterComponent', () => {
  let component: LoggedInFooterComponent;
  let fixture: ComponentFixture<LoggedInFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedInFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedInFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
