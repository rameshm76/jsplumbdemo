import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesContainerComponent } from './nodes-container.component';

describe('NodesContainerComponent', () => {
  let component: NodesContainerComponent;
  let fixture: ComponentFixture<NodesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
