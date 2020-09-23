import { Component, OnInit } from '@angular/core';
import { AnalyticService } from "../../../services/analytic.service"
declare var require: any;
import { EChartOption } from 'echarts';

@Component({
  selector: 'tasks-chart',
  templateUrl: './tasks-chart.component.html',
  styleUrls: ['./tasks-chart.component.css']
})
export class TasksChartComponent implements OnInit {

  public doghnutChart:any = {};
  public AnalityicData:any;
  constructor(private AnalyticService: AnalyticService) {
    this.AnalityicData ={MiniData:[0,0]}
    
  }
  
  ngOnInit() {
    this.AnalyticService.currentUserMiniData.subscribe(dataByService => {
        console.log(dataByService)
        this.AnalityicData = dataByService;
        this.doghnutChart = this.getDougnutChartOptions();
    });
  }
  getDougnutChartOptions(){
    let options: any = {
      title: {
          text: '0%',
          x: 'center',
          y: 'center',
          textStyle : {
              color : 'rgb(33, 33, 33)',
              fontFamily : 'Arial',
              fontSize : 20,
              fontWeight : 'bolder'
          }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: ['Pending', 'Finished']
      },
      series : [
          {
              name: 'Tasks',
              type: 'pie',
              startAngle: 215,
              clockWise: 1,
              radius : [38, 50],
              itemStyle : {
                  normal: {
                      label: {show: false},
                      labelLine: {show: false}
                  }
              },
              data: [
                    {
                        name: "Pending",
                        value: this.AnalityicData.MiniData[0],
                        itemStyle :  {
                            color: '#f5ab6b',
                            emphasis : {
                                color: '#f3994c'
                            }
                        }
                    },
                    {
                        name: "Finished",
                        value: this.AnalityicData.MiniData[1],
                        itemStyle :  {
                            normal: {
                                color: '#6ebed1',
                                label: {show: false},
                                labelLine: {show: false},
                                tooltip: {show: false}
                            },
                            emphasis : {
                                color: '#56b4cb'
                            }
                        }
                    }
                ]
          }
      ]
    }

    return options;
  }

}
