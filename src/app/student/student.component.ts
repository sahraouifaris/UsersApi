import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/models/students.model';
import { StudentsService } from 'src/services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent  implements OnInit {
  @Input() student: Student;
  @Output() onRemoveStudent = new EventEmitter<number>();
  @Output() onEditStudent = new EventEmitter<number>();
 user:any;
  constructor(private studentsService: StudentsService,
    private route: ActivatedRoute,
    private router:Router,
    ) {
    this.student = {
      first_name: '',
      last_name: '',
      image: '',
      username: '',
      email: '',_id:""
        };
  }

  ngOnInit(): void {
    console.log(this.student);
  }

  deleteStudentClicked(id:any) {
    console.log(id);
    this.confirmBox(id);

  }

  editStudentClicked(id:any){
    this.router.navigate(["/updateuser/"+id]);
  }
  detailStudentClicked(id:any){
    this.router.navigate(["/user/"+id]);
  }
  
  confirmBox(id:any){
    this.studentsService.getStudentbyId(id).subscribe((res:Student)=>{
      this.student=res;
    })
    Swal.fire({
      title: 'Are you sure want to Remove '+   this.student.username+'?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.onRemoveStudent.emit(id);
        console.log(id);
        this.studentsService.deleteStudents(Number(id)).subscribe((res:any) => {
          if(res.error == null)  {
            Swal.fire(
              'Response',
              res.error,
              'error'
            )
          }else{
            Swal.fire(
              this.student.username ,
              'is Deleted',
              'success'
            )
          }
         

        });
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
