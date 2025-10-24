import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribuyenteComponent } from './contribuyente.component';

describe('ContribuyenteComponent', () => {
  let component: ContribuyenteComponent;
  let fixture: ComponentFixture<ContribuyenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContribuyenteComponent]
    });
    fixture = TestBed.createComponent(ContribuyenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
