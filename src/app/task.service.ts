import { Injectable } from '@angular/core';
import { Tasks } from './tasks';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private TASKS: Tasks[] = [
    {
      id: 1,
      title: 'Create Web Page 1',
      description: 'Front End Developer 1',
      status: 'Pending'
    },
    {
      id: 2,
      title: 'Create Web Page 2',
      description: 'Front End Developer 2',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'Create Web Page 3',
      description: 'Front End Developer 3',
      status: 'Pending'
    },
    {
      id: 4,
      title: 'Create Web Page 4',
      description: 'Front End Developer 4',
      status: 'Pending'
    },
    {
      id: 5,
      title: 'Create Web Page 5',
      description: 'Front End Developer 5',
      status: 'Pending'
    },
    {
      id: 6,
      title: 'Create Web Page 6',
      description: 'Front End Developer 6',
      status: 'Pending'
    }
   
];

constructor (private http: HttpClient) {}
getTasksMock(): Tasks[] {
  return this.TASKS;
}

}
