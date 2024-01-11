import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.taskForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onSubmit() {
    let tasks: any;
    this.markFormGroupTouched(this.taskForm);
    if (this.taskForm.valid) {
      let storedArrayString: any = localStorage.getItem('tasks');
      let tasks: any[] = storedArrayString ? JSON.parse(storedArrayString) : [];
      tasks.push(this.taskForm.value);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.router.navigate(['']);
    }

  }
   markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  hasError(controlName: string, errorType: string): any {
    const control = this.taskForm.get(controlName);
    return control && control.hasError(errorType) && control.touched;
  }
}
