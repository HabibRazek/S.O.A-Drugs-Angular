import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDrugClassComponent } from './update-drug-class.component';

describe('UpdateDrugClassComponent', () => {
  let component: UpdateDrugClassComponent;
  let fixture: ComponentFixture<UpdateDrugClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDrugClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDrugClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
