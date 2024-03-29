import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private firebase:AngularFireDatabase,private datePipe: DatePipe) { }

  employeeList: AngularFireList<any>;


  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name:new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
    mobile:new FormControl('',[Validators.required,Validators.minLength(8)]),
    city:new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false),

  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      name: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false,
    });
  }

  getEmployees() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }

  insertEmployee(employee) {
    this.employeeList.push({
      name: employee.name,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      isPermanent: employee.isPermanent,
    });
  }
   
  updateEmployee(employee) {
    this.employeeList.update(employee.$key,
      {
        name: employee.name,
        email: employee.email,
        mobile: employee.mobile,
        city: employee.city,
        gender: employee.gender,
        department: employee.department,
         hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
         isPermanent: employee.isPermanent
      });
  }

  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }
  populateForm(employee) {
    this.form.setValue(_.omit(employee,'departments'));
  }


}
