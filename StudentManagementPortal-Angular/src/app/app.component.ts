import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Studentservice } from './student.service';
import { Student } from './student';
import { Advisor } from './advisor';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'student-management-app';
  public activeIndex: number;
  public studcols: any = [];
  public totalRecords: number;
  public selectedStudent: Student = {};
  public studentInfo: Student = {};
  public allStudentInfo: Student[] = [];
  public selectedRollNo: Student = {};
  public editedStudentInfo: Student = {};
  public advisorInfo: Advisor = {};
  public displayModal: boolean = false;

  constructor(private spinner:NgxSpinnerService, private studentservice: Studentservice, private messageService: MessageService) {
    this.studcols = [{ header: 'Roll Number', field: 'rollNo' },
    { header: 'Student Name', field: 'firstname' },
    { header: 'Last Name', field: 'lastName' },
    { header: 'Address', field: 'address' },
    { header: 'Contact', field: 'contact' },
    { header: 'Email Id', field: 'email' },
    { header: 'Course', field: 'course' },
    { header: 'Advisor Name', field: 'advisor' }];
    this.studentservice.getAllStudentInfo().subscribe((data: Student[]) => {
      if (Object.keys(data).length != 0) {
        this.allStudentInfo = data;
        this.totalRecords = this.allStudentInfo.length;
        this.activeIndex = 0;
      }
    });
  }
  ngOnInit() { }

  viewAdvisorInfo(advisorId: any) {
    this.displayModal = false;
    this.studentservice.getAdvisorInfo().subscribe((data: Advisor[]) => {
      if (Object.keys(data).length != 0) {
        for (let val in data) {
          if (data[val].advisorId == advisorId) {
            this.advisorInfo = data[val];
            this.displayModal = true;
          }
        }
      }
    });
  }

  validateInputs(studentInfo: Student) {
    if (studentInfo.firstname == null || studentInfo.firstname.trim() == '' || studentInfo.firstname == undefined) {
      this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'First Name should not be empty!' });
      return false;
    } if (studentInfo.lastName == null || studentInfo.lastName.trim() == '' || studentInfo.lastName == undefined) {
      this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Last Name should not be empty!' });
      return false;
    } if (studentInfo.address == null || studentInfo.address.trim() == '' || studentInfo.address == undefined) {
      this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Address should not be empty!' });
      return false;
    } if (studentInfo.contact == null || studentInfo.contact.trim() == '' || studentInfo.contact == undefined) {
      this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Contact should not be empty!' });
      return false;
    } if (studentInfo.email == null || studentInfo.email.trim() == '' || studentInfo.email == undefined) {
      this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Email Id should not be empty!' });
      return false;
    } if (studentInfo.course == null || studentInfo.course.trim() == '' || studentInfo.course == undefined) {
      this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Course should not be empty!' });
      return false;
    } if (studentInfo.rollNo == null || studentInfo.rollNo.trim() == '' || studentInfo.rollNo == undefined) {
      this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Roll Number should not be empty!' });
      return false;
    } if (studentInfo.advisor == null || studentInfo.advisor.trim() == '' || studentInfo.advisor == undefined) {
      this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Advisor Name should not be empty!' });
      return false;
    }
    return true;
  }

  saveStudentInfo(studentInfo: Student, dropdown: any) {
    if (Object.keys(studentInfo).length != 0) {
      if (this.validateInputs(studentInfo)) {
        this.proceedToSave(studentInfo, dropdown);
      }
    } else {
      this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Please enter a valid inputs!' });
      return false;
    }
  }

  proceedToSave(studentInfo: Student, dropdown: any) {
    this.spinner.show();
    let isSave: boolean = false;
    for (let val in this.allStudentInfo) {
      if (this.allStudentInfo[val].rollNo == studentInfo.rollNo.trim()) {
        isSave = true;
      }
    } if (!isSave) {
      this.allStudentInfo.unshift(studentInfo);
      dropdown.options = this.allStudentInfo;
      setTimeout(() => {
        this.spinner.hide();
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: 'Student information has been added successfully!' });
        this.activeIndex = 0;
        this.resetStudentInfo();
      }, 3000);
    } else {
      this.spinner.hide();
      this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Roll number is already exist!' });
    }
  }

  onChangeRollNumber(event: any) {
    this.editedStudentInfo = {};
    if (Object.keys(event.value).length != 0) {
      this.editedStudentInfo = event.value;
    }
  }

  updateStudentInfo(editedStudentInfo: Student) {
    this.spinner.show();
    if (Object.keys(this.selectedRollNo).length != 0) {
      if (Object.keys(editedStudentInfo).length != 0) {
        if (this.validateInputs(editedStudentInfo)) {
          for (let val in this.allStudentInfo) {
            if (this.allStudentInfo[val].rollNo == editedStudentInfo.rollNo.trim()) {
              this.allStudentInfo[val] == editedStudentInfo;
              setTimeout(() => {
                this.spinner.hide();
                this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: 'Student information has been updated successfully!' });
                this.activeIndex = 0;
                this.resetStudentInfo();
              },3000);
            }
          }
        }
      } else {
        this.spinner.hide();
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Please enter a valid inputs!' });
        return false;
      }
    } else {
      this.spinner.hide();
      this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Please search with Roll Number!' });
      return false;
    }
  }
  removeStudentInfo() {
    this.spinner.show();
    let updatedStudent: Student[] = [];
    if (Object.keys(this.selectedRollNo).length != 0) {
      for (let val in this.allStudentInfo) {
        if (this.allStudentInfo[val].rollNo != this.selectedRollNo.rollNo.trim()) {
          updatedStudent.push(this.allStudentInfo[val]);
        }
      }
      setTimeout(() => {
        this.spinner.hide();
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: 'Student information has been deleted successfully!' });
        this.activeIndex = 0;
        this.allStudentInfo = updatedStudent;
        this.resetStudentInfo();
      }, 3000);
    } else {
      this.spinner.hide();
      this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Please select the roll number to remove!' });
      return false;
    }
  }
  resetStudentInfo() {
    this.studentInfo = {};
    this.selectedRollNo = {};
    this.editedStudentInfo = {};
  }
}
