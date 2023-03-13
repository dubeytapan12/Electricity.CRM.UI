import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ElectricityUserService } from '../user/electricity-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'ng2-charts-demo';

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
    })
  }

}
