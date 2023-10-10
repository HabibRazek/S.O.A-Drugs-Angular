import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDrugsClassComponent } from './liste-drugs-class.component';

describe('ListeDrugsClassComponent', () => {
  let component: ListeDrugsClassComponent;
  let fixture: ComponentFixture<ListeDrugsClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDrugsClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDrugsClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
