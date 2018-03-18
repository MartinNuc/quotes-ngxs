import { ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

export class Page<T> {
  component: T;

  constructor(protected fixture: ComponentFixture<T>) {
    this.component = fixture.componentInstance;
  }

  protected query<U>(selector: string): U {
    return this.fixture.nativeElement.querySelector(selector);
  }

  protected queryAll<U>(selector: string): U[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}
