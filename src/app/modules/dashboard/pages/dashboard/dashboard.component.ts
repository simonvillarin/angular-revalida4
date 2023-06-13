import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Product } from 'src/app/modules/product-list/models/product';
import { ProductListService } from 'src/app/modules/product-list/services/product-list.service';

export interface PCParts {
  item: string;
  position: number;
  price: number;
  qtySold: number;
  totalSales: number;
}

const ELEMENT_DATA: PCParts[] = [
  {
    position: 1,
    item: 'Notebooks',
    price: 1750.0,
    qtySold: 90,
    totalSales: 157500,
  },
  { position: 2, item: 'SSD', price: 4026.0, qtySold: 70, totalSales: 281820 },
  {
    position: 3,
    item: 'Keyboard',
    price: 691.65,
    qtySold: 50,
    totalSales: 34582.5,
  },
  {
    position: 4,
    item: 'Mother Board',
    price: 9012.2,
    qtySold: 30,
    totalSales: 270366,
  },
  {
    position: 5,
    item: 'Desktop',
    price: 108.11,
    qtySold: 10,
    totalSales: 1081.1,
  },
];

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
      console.log(res);
      let filterData = res.sort((a, b) => b.soldItems - a.soldItems);
      console.log(filterData);
      this.products = filterData.slice(0, 5);
      this.categories = res.map((product) => product.category);
      this.soldItems = res.map((product) => product.soldItems);
      // No name duplicate of products
      const uniqueCategories = [...new Set(this.categories)]; 

      Chart.register(...registerables);

      const data = {
        labels: uniqueCategories,
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
