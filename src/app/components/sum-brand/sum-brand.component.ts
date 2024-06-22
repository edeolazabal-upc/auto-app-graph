import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, } from 'chart.js/auto';
import { BrandSummary } from '../../model/summary';
import { AutoService } from '../../services/auto.service';

@Component({
  selector: 'app-sum-brand',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sum-brand.component.html',
  styleUrl: './sum-brand.component.css'
})
export class SumBrandComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;

  public chart: Chart;
  dataSource: BrandSummary[] = [];
  nombres: string[] = [];
  valores: number[] = [];

  constructor(private autoService: AutoService) {}


  ngOnInit(): void {
    this.getBrandSummaries().then((data: BrandSummary[]) => {
      this.dataSource = data;
      this.nombres = this.dataSource.map(item => item.brand);
      this.valores = this.dataSource.map(item => item.total);

      this.createChart();
    }).catch(error => {
      console.error('Error fetching importes', error);
    });
  }

  getBrandSummaries(): Promise<BrandSummary[]> {
    return new Promise((resolve, reject) => {
      this.autoService.getBrandSummaries().subscribe(
        (data: BrandSummary[]) => {
          this.dataSource = data;
          console.log(this.dataSource);
          resolve(this.dataSource);
        },
        (error) => {
          console.error('Error fetching importes', error);
          reject(error);
        }
      );
    });
  }

  createChart(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const chartData = {
        labels: this.nombres,
        datasets: [{
          label: 'Total Vendido por Marca',
          data: this.valores,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error("Failed to get 2D context");
    }
  }

}
