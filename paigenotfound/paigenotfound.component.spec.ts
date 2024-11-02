import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaigenotfoundComponent } from './paigenotfound.component';

describe('PaigenotfoundComponent', () => {
  let component: PaigenotfoundComponent;
  let fixture: ComponentFixture<PaigenotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaigenotfoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaigenotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
