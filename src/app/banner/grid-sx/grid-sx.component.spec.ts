import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSxComponent } from './grid-sx.component';

describe('GridSxComponent', () => {
  let component: GridSxComponent;
  let fixture: ComponentFixture<GridSxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridSxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridSxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
