
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AddTaskComponent } from './add-task.component';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [AddTaskComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: Router, useValue: spy }],
    });

    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize form controls properly', () => {
    expect(component.taskForm.get('id')).toBeTruthy();
    expect(component.taskForm.get('title')).toBeTruthy();
    expect(component.taskForm.get('description')).toBeTruthy();
    expect(component.taskForm.get('status')).toBeTruthy();
  });
  it('should show validation errors for required fields on form submission', fakeAsync(() => {
    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(component.taskForm.get('id')?.hasError('required')).toBeTruthy();
    expect(component.taskForm.get('title')?.hasError('required')).toBeTruthy();
    expect(component.taskForm.get('description')?.hasError('required')).toBeTruthy();
    expect(component.taskForm.get('status')?.hasError('required')).toBeTruthy();
  }));
  it('should show validation errors for title minlength on form submission', fakeAsync(() => {
    // Set invalid title with less than 3 characters
    component.taskForm.patchValue({ title: 'ab' });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(component.taskForm.get('title')?.hasError('minlength')).toBeTruthy();
  }));

  it('should not show validation errors if form is submitted with valid data', fakeAsync(() => {
    // Set valid values to form controls
    component.taskForm.patchValue({
      id: 1,
      title: 'Valid Title',
      description: 'Valid Description',
      status: 'Pending',
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(component.taskForm.get('id')?.hasError('required')).toBeFalsy();
    expect(component.taskForm.get('title')?.hasError('required')).toBeFalsy();
    expect(component.taskForm.get('title')?.hasError('minlength')).toBeFalsy();
    expect(component.taskForm.get('description')?.hasError('required')).toBeFalsy();
    expect(component.taskForm.get('status')?.hasError('required')).toBeFalsy();
  }));

  it('should navigate to the correct route on successful form submission', fakeAsync(() => {
    // Set valid values to form controls
    component.taskForm.patchValue({
      id: 1,
      title: 'Valid Title',
      description: 'Valid Description',
      status: 'Pending',
    });

    component.onSubmit();
    tick();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  }));

  it('should mark form controls as touched when calling markFormGroupTouched', () => {
    component.markFormGroupTouched(component.taskForm);
    expect(component.taskForm.get('id')?.touched).toBeTruthy();
    expect(component.taskForm.get('title')?.touched).toBeTruthy();
    expect(component.taskForm.get('description')?.touched).toBeTruthy();
    expect(component.taskForm.get('status')?.touched).toBeTruthy();
  });

  it('should show validation errors only when controls are touched', fakeAsync(() => {
    // Set invalid values to form controls
    component.taskForm.patchValue({
      id: null,
      title: '',
      description: '',
      status: '',
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(component.taskForm.get('id')?.hasError('required')).toBeTruthy();
    expect(component.taskForm.get('title')?.hasError('required')).toBeTruthy();
    expect(component.taskForm.get('description')?.hasError('required')).toBeTruthy();
    expect(component.taskForm.get('status')?.hasError('required')).toBeTruthy();

    // Check if validation errors are not shown when controls are not touched
    component.taskForm.markAsUntouched();

    expect(component.taskForm.get('id')?.hasError('required')).toBeFalsy();
    expect(component.taskForm.get('title')?.hasError('required')).toBeFalsy();
    expect(component.taskForm.get('description')?.hasError('required')).toBeFalsy();
    expect(component.taskForm.get('status')?.hasError('required')).toBeFalsy();
  }));
});
