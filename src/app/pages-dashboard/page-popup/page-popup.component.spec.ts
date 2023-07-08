import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePopupComponent } from './page-popup.component';

describe('PagePopupComponent', () => {
  let component: PagePopupComponent;
  let fixture: ComponentFixture<PagePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagePopupComponent]
    });
    fixture = TestBed.createComponent(PagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
