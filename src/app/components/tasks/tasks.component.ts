import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Tasks } from 'src/app/tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];

  constructor(private userService: TaskService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }
  getAllTasks(): void {
    let data: any
    let storedArrayString: any = localStorage.getItem('tasks');
    let tasks: any[] = storedArrayString ? JSON.parse(storedArrayString) : [];
    if (!tasks.length) {
      data = this.userService.getTasksMock();
      localStorage.setItem('tasks', JSON.stringify(data));
      this.tasks = data;
    } else {
      this.tasks = tasks;
    }

  }
   deleteTask(taskToDelete: any): void {
    const index = this.tasks.findIndex(task => task === taskToDelete);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}
