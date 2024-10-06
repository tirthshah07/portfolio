import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassionProjectsComponent } from './passion-projects.component';

describe('PassionProjectsComponent', () => {
  let component: PassionProjectsComponent;
  let fixture: ComponentFixture<PassionProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassionProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassionProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
