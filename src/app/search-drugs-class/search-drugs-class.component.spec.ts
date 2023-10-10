import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDrugsClassComponent } from './search-drugs-class.component';

describe('SearchDrugsClassComponent', () => {
  let component: SearchDrugsClassComponent;
  let fixture: ComponentFixture<SearchDrugsClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDrugsClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDrugsClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
