import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageOnScreenComponent } from './message-on-screen.component';

describe('MessageOnScreenComponent', () => {
  let component: MessageOnScreenComponent;
  let fixture: ComponentFixture<MessageOnScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageOnScreenComponent]
    });
    fixture = TestBed.createComponent(MessageOnScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
