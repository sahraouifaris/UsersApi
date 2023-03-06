import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Student } from 'src/models/students.model';
import { StudentsService } from 'src/services/students.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit { 
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addStudentButton') addStudentButton: any;
  title = 'StudentsCRUD';

  studentsForm: FormGroup;

  students: Student[];
  studentsToDisplay: Student[];


  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService
  ) {
    this.studentsForm = fb.group({});
    this.students = [];
    this.studentsToDisplay = this.students;
  }

  ngOnInit(): void {
    this.studentsForm = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      birthday: this.fb.control(''),
      gender: this.fb.control(''),
      company: this.fb.control(''),
      jobExperience: this.fb.control(''),
      salary: this.fb.control(''),
    });

    


  }

  ngAfterViewInit(): void {
    //this.buttontemp.nativeElement.click();
  }

  





}
