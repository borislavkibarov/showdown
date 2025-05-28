import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSetupComponent } from './team-setup.component';

describe('TeamSetupComponent', () => {
  let component: TeamSetupComponent;
  let fixture: ComponentFixture<TeamSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
