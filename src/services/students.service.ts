import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student} from '../models/students.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  baseUrl = 'https://peticiones.online/api/users';

  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get<any>(this.baseUrl);
  }
  getStudentbyId(id:any){
    return this.http.get<any>(this.baseUrl+ '/' + id)
  }

  postStudents(student: Student) {
    return this.http.post<Student>(this.baseUrl, student);
  }
  UpdateStudents(id: any, Student:Student) {
    return this.http.put(this.baseUrl + '/' + id,Student);
  }

  deleteStudents(id: any) {
    console.log(id);
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
