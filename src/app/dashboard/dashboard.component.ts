import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ElectricityUserService } from '../user/electricity-user.service';
import { ElectricityUser } from './electricity-user';
import { saveAs } from 'file-saver';
import { User } from '../user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'ng2-charts-demo';
  users: User[] = [];
  cols: any[] = [];
  connectionType: string = '';
  exportColumns: any[] = [];
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

   // Pie
   public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor(private service:ElectricityUserService) {}

  ngOnInit() {
    this.service.GetGroupedBill().subscribe({
      next: result=> {
        this.barChartData = {
          labels: result.connectionTypes,
          datasets: [{ data: result.totalAmounts, label: 'Different Biller' }]
        };      
        this.pieChartDatasets = [ {
          data: result.totalAmounts
        }];
        this.pieChartLabels = result.connectionTypes as never[];
      }
    }); 
    this.cols = [
      { field: "fName", header: "First Name" },
      { field: "lName", header: "Last Name" },
      { field: "connectionDate", header: "Connection Date" },
      { field: "mobile", header: "Mobile" },
      { field: "isUsingNewMeeter", header: "Is New Meeter" },
      { field: "fatherName", header: "Father Name" },
      { field: "dob", header: "DOB" },
      { field: "addressLine1", header: "Address 1" },
      { field: "addressLine2", header: "Address 2" },
      { field: "city", header: "City" },
      { field: "district", header: "District" },
      { field: "state", header: "State" },
      { field: "pincode", header: "Pin Code" },
      { field: "notes", header: "Notes" }
    ];
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
  }

  bindUsers(connectionType:string) {
    if(connectionType==="-1") {
      this.users = [];
      this.connectionType ='';
      return;
    }
    this.connectionType =connectionType;
    this.service.GetUsers(connectionType).subscribe({
      next:items=> this.users=items,
      error: error=> alert('error occured while getting users grid data')
    });
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.users);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "users");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    //import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
   // });
  }

  onRowEditInit(user: User, index: number) {
   
}
deleteUser(id:number) {
  this.service.removeUser(id,this.connectionType).subscribe({
    next: item=> { alert('deleted') 
  this.bindUsers(this.connectionType);
  },
    error: error=> alert('error while deleting')
  })
}
onRowEditSave(user: User, index: number) {
  this.service.updateUser(user,this.connectionType).subscribe({next:item=> alert('updated'),error: er=> alert('error while updating')});
}
}
