import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Product } from 'src/app/modules/product-list/models/product';
import { ProductListService } from 'src/app/modules/product-list/services/product-list.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isShowMenu: boolean = false;
  products: Product[] = [];
  categories: any[] = [];
  soldItems: any[] = [];

  constructor(
    private router: Router,
    private productService: ProductListService
  ) {}

  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  logout = () => {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  };

  getAllProducts = () => {
    this.productService.getAllProducts().subscribe((res) => {
      let filterData = res.sort((a, b) => b.price - a.price);
      this.products = filterData.slice(0, 5);
      this.categories = res.map((product) => product.category);
      this.soldItems = res.map((product) => product.soldItems);

      Chart.register(...registerables);

      const data = {
        labels: this.categories,
        datasets: [
          {
            label: 'Product List',
            data: this.soldItems,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(76, 175, 80)',
            tension: 0.1,
          },
        ],
      };

      new Chart('lineChart', {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          animation: {
            duration: 1500,
            easing: 'easeInOutBounce',
            delay: 100,
          },
        },
      });
    });
  };

  localString = (num: number) => {
    return num.toLocaleString();
  };

  ngOnInit(): void {
    this.getAllProducts();
  }
}
