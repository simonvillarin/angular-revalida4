import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

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

  constructor(private router: Router) { }

  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  logout = () => {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  };

  ngOnInit(): void {
    Chart.register(...registerables);

    const data = {
      labels: ['Desktop', 'Notebooks', 'Mother Board', 'SSD', 'Keyboard'],
      datasets: [
        {
          label: 'Top 5 Items',
          data: [10, 90, 30, 70, 50],
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
          duration: 3000,
          easing: 'easeInOutBounce', 
          delay: 500,
          
        },
      },
    });
  }

  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (element: PCParts) => `${element.position}`,
    },
    {
      columnDef: 'item',
      header: 'Item',
      cell: (element: PCParts) => `${element.item}`,
    },
    {
      columnDef: 'price',
      header: 'Price',
      cell: (element: PCParts) => `${element.price}`,
    },
    {
      columnDef: 'qtySold',
      header: 'Quantity Sold',
      cell: (element: PCParts) => `${element.qtySold}`,
    },
    {
      columnDef: 'totalSales',
      header: 'Total Sales',
      cell: (element: PCParts) => `${element.totalSales}`,
    },
  ];
  dataSource = ELEMENT_DATA;
  displayedColumns = this.columns.map((c) => c.columnDef);
}
