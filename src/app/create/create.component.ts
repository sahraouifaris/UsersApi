import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Console } from 'console';
import { json } from 'express';
import { Student } from 'src/models/students.model';
import { StudentsService } from 'src/services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, AfterViewInit { 
  @ViewChild('addStudentButton') addStudentButton: any;
  title = 'StudentsCRUD';
  submitted:any;

  studentsForm: FormGroup;

  students: Student[];


  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
  ) {
    this.studentsForm = fb.group({});
    this.students = [];
  }

  ngOnInit(): void {
    this.studentsForm = this.fb.group({
      firstname:['',Validators.required],
      lastname: ['',Validators.required],
      username:['',Validators.required],
      image:['',Validators.required],
      email:['',Validators.required,Validators.email],
    });

  }

  ngAfterViewInit(): void {
    //this.buttontemp.nativeElement.click();
  }

  addStudent() {

    if (this.studentsForm.invalid) {
      this.submitted=false;
      return;
      
    }else{
      this.submitted=true;
    let student: Student = {
      first_name: this.FirstName.value,
      last_name: this.LastName.value,
      username: this.UserName.value,
      image: this.Image.value,
      email: this.Email.value,
      _id: ''
    };
    this.studentsService.postStudents(student).subscribe((res) => {
      console.log(res);
      this.students.unshift(res);
      this.clearForm();
      Swal.fire("New User Created Successfully","Response :{id:"+ res.id +"name:"+res.first_name +res.last_name+"}" ,'success');

    });
  }
  }



  setForm(std: Student) {
    this.FirstName.setValue(std.first_name);
    this.LastName.setValue(std.last_name);
    this.UserName.setValue(std.username);
    this.Image.setValue(std.image);
    this.Email.setValue(std.email);
  }



  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.Email.setValue('');
    this.UserName.setValue('');
    this.Image.setValue('');
  }

  public get FirstName(): FormControl {
    return this.studentsForm.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.studentsForm.get('lastname') as FormControl;
  }
  public get Email(): FormControl {
    return this.studentsForm.get('email') as FormControl;
  }
  public get UserName(): FormControl {
    return this.studentsForm.get('username') as FormControl;
  }
  public get Image(): FormControl {
    return this.studentsForm.get('image') as FormControl;
  }
 
}