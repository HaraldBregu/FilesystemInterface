import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantsTableComponent } from './variants-table.component';

describe('VariantsTableComponent', () => {
  let component: VariantsTableComponent;
  let fixture: ComponentFixture<VariantsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariantsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
