import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/models/students.model';
import { StudentsService } from 'src/services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit { 
  @ViewChild('addStudentButton') addStudentButton: any; 
  
  std: Student = {
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: '',
    _id: ''
  };
  Pid:string | undefined;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private fb: FormBuilder,
    private studentsService: StudentsService  ) {
      this.studentsForm = fb.group({});

    }
    
    submitted:any;
    studentsForm: FormGroup;
    ngOnInit(): void {
      this.route.paramMap.subscribe((param) => {
        this.Pid = (param.get('id'))?.toString();
        this.getById(this.Pid);
        this.studentsForm = this.fb.group({
          firstname:['',Validators.required],
        lastname: ['',Validators.required],
        username:['',Validators.required],
        image:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
      });
    });
  }
 
  getById(id: any) {
    this.studentsService.getStudentbyId(id).subscribe((data) => {
      this.std = data;
      this.setForm(this.std);
    });
  }
 
  update() {
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
    this.studentsService.UpdateStudents(this.Pid,student)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/home"]);
      },
      error:(err) => {
        Swal.fire(err,"error");
      }
    })
  }
  }
  setForm(std: Student) {
    this.FirstName.setValue(std.first_name);
    this.LastName.setValue(std.last_name);
    this.UserName.setValue(std.username);
    this.Image.setValue(std.image);
    this.Email.setValue(std.email);
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
