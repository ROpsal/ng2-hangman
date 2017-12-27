/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WinsComponent } from './wins.component';

describe('WinsComponent', () => {
  let component: WinsComponent;
  let fixture: ComponentFixture<WinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
