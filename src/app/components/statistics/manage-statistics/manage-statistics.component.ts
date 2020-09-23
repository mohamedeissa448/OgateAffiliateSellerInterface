import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-manage-statistics',
  templateUrl: './manage-statistics.component.html',
  styleUrls: ['./manage-statistics.component.css']
})
export class ManageStatisticsComponent implements OnInit {
  numOfCanceledOrders:any = 0 ;
  numOfReturnedOrders:any = 0 ;
  numOfCollectedOrders:any = 0 ;//succeeded
  numOfShippedOrders:any = 0 ;
  numOfAllOrders:any = 0 ;
  public stackedBarChart: EChartOption = {};

  constructor(private statisticsService : StatisticsService) {
    
   }

  ngOnInit() {
  
    this.statisticsService.getCountOfShippedOrdersByAffiliateSellerId().subscribe((response:any)=>{
      if(response.message == true)
        this.numOfShippedOrders = response.count ;
      this.statisticsService.getCountOfCollectedOrdersByAffiliateSellerId().subscribe((response:any)=>{
          if(response.message == true)
            this.numOfCollectedOrders = response.count ;
          this.statisticsService.getCountOfReturnedOrdersByAffiliateSellerId().subscribe((response:any)=>{
              if(response.message == true)
                this.numOfReturnedOrders = response.count ;
              this.statisticsService.getCountOfCanceledOrdersByAffiliateSellerId().subscribe((response:any)=>{
                  if(response.message == true)
                    this.numOfCanceledOrders = response.count ;
                    this.statisticsService.getCountOfAllOrdersByAffiliateSellerId().subscribe((response:any)=>{
                      if(response.message == true)
                        this.numOfAllOrders = response.count ;
                        console.log("this.numOfAllOrders",this.numOfAllOrders);
                        this.stackedBarChart = this.getTopProductChartOptions();
                  });  
              });  
          });  
      });      
    });
   
  }

  getTopProductChartOptions() {
    let options: any = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['Orders'],
            right: '4%',
            textStyle: {
                color: "#C2C2C2",
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Canceled', 'Returned', 'Shipped','Collected', 'All'],
                axisLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: "#C2C2C2",
                    },
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                minInterval: 0,
                splitLine: {
                    lineStyle: {
                        type: 'dotted'
                    }
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    formatter: function (value, index) {
                        if (value > 1000) {
                            return (value / 1000) + ' K';
                        } else {
                            return value;
                        }
                    },
                    textStyle: {
                        color: "#C2C2C2",
                    }
                }
            }
        ],
        series: [
            {
                name: 'Orders',
                type: 'bar',
                stack: 'Gedgets',
                data: [this.numOfCanceledOrders,this.numOfReturnedOrders,this.numOfShippedOrders,this.numOfCollectedOrders,this.numOfAllOrders],
                itemStyle: {
                    color: "#6ebdd1"
                },
                barWidth: "40px"
            },
            
        ]
    };

    return options;
}

}
