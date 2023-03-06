import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from 'src/models/students.model';
import { StudentsService } from 'src/services/students.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, AfterViewInit { 
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

    

    this.studentsService.getStudents().subscribe((res) => {
      console.log(res.results);
      for (let std of res.results) {
        this.students.unshift(std);
      }
      this.studentsToDisplay = this.students;
    });
  }
  searchStudents(event: any) {
    let filteredStudents: Student[] = [];

    if (event === '') {
      this.studentsToDisplay = this.students;
    } else {
      filteredStudents = this.students.filter((val, index) => {
        let targetKey = val.first_name.toLowerCase() + '' + val.last_name.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.studentsToDisplay = filteredStudents;
    }
  }
  ngAfterViewInit(): void {
    //this.buttontemp.nativeElement.click();
  }
  simpleAlert(){
    Swal.fire('Hello world!');
  }
  alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }
  
  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

}
