import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent{

  @Input() userRatingsReview: any[] = [];
  @Input() userCount: number = 0;
  @Input() totalRating: number = 0;
  @Input() aveUserRating: any;
  @Input() prodName: string = "";

}
