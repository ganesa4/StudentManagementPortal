import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Studentservice } from './student.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  const routes: Routes = [
    { path: 'dashboard', component: AppComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(routes),
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },Studentservice,MessageService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'student-management-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('student-management-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar-brand span').textContent).toContain('Student Management Portal');
  });
});
