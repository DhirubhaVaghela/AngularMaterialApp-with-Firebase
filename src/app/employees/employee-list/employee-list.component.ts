import { Component, OnInit, ViewChild} from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import {DepartmentService} from 'src/app/shared/department.service';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { EmployeeComponent } from '../employee/employee.component';
import {NotificationService} from 'src/app/shared/notification.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'email', 'mobile', 'city','actions'];

@ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private service:EmployeeService,private departmentservice:DepartmentService,private dialog:MatDialog, private notificationservice:NotificationService) { }

  ngOnInit() {
    this.service.getEmployees().subscribe(
      list => {
        let array = list.map( item => {
            return {
              $key: item.key,
              
              ...item.payload.val()
            };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
        

      });
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus= true;
    dialogConfig.width="60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig);   
  }

  onDelete($key){
    if(confirm('Are you sure to delete this record ?')){
    this.service.deleteEmployee($key);
    this.notificationservice.warn('! Deleted successfully');
    }
  }

}
