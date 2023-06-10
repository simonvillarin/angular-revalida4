import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  
  @Input() userRatingsReview: any[] = [];
  @Input() userCount: number = 0;
  @Input() totalRating: number = 0;
  @Input() aveUserRating: any;
  @Input() prodName: string = "";
  totalStar: number = 5;
  ratingArray: number[] = [];

  aveIconStatus(index: number) {
    if (index < this.aveUserRating) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  iconStatus(rating: number, index: number) {
    if (rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  
  ngOnInit(): void {
    for (let index = 0; index < this.totalStar; index++) {
      this.ratingArray.push(index);
    }
  }
}
