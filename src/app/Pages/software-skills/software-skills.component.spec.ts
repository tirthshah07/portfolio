import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareSkillsComponent } from './software-skills.component';

describe('SoftwareSkillsComponent', () => {
  let component: SoftwareSkillsComponent;
  let fixture: ComponentFixture<SoftwareSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareSkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
