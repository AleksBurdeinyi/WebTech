import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestnetComponent } from './testnet.component';

describe('TestnetComponent', () => {
  let component: TestnetComponent;
  let fixture: ComponentFixture<TestnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestnetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
