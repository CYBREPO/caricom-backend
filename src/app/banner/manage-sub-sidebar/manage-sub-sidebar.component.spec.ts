import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubSidebarComponent } from './manage-sub-sidebar.component';

describe('ManageSubSidebarComponent', () => {
  let component: ManageSubSidebarComponent;
  let fixture: ComponentFixture<ManageSubSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSubSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSubSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
