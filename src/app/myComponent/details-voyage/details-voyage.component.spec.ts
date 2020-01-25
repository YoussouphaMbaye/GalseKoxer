import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVoyageComponent } from './details-voyage.component';

describe('DetailsVoyageComponent', () => {
  let component: DetailsVoyageComponent;
  let fixture: ComponentFixture<DetailsVoyageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsVoyageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
