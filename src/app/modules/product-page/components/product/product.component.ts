import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/modules/product-list/models/product';
import { ProductListService } from 'src/app/modules/product-list/services/product-list.service';
import { UserListService } from 'src/app/modules/user-list/services/user-list.service';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { CheckoutService } from 'src/app/shared/services/checkout/checkout.service';
import { CommentService } from 'src/app/shared/services/comment/comment.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  quantity: number = 1;
  activeTab: string = 'description';
  userCount: number = 0;
  totalRating: number = 0;
  aveUserRating: any;
  totalStar: number = 5;
  ratings: number[] = [];
  ratingArray: number[] = [];
  prodName: string = 'Lenovo DB60 Slim USB Portable DVD Burner DB60-WW';

  product: Product | undefined;
  comments: any[] = [];
  comment: string = '';
  userId: number = 0;
  productId: number = 0;
  fullName: string = '';
  firstLetter: string = '';
  commentId: number = 0;
  isEdit: boolean = false;
  showCheck: boolean = false;
  showSpinner: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductListService,
    private userListService: UserListService,
    private commentService: CommentService,
    private cartService: CartService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.getProductDetails();
    this.getFirstLetter();
    this.getAllComments();
  }

  getProductDetails = () => {
    this.productService
      .getProductById(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.product = data;
        this.productId = data.productId;
      });
  };

  getAllComments = () => {
    this.productService
      .getProductById(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.commentService.getAllComment(data.productId).subscribe((data) => {
          this.comments = data;
          this.comments.reverse();
        });
      });
  };

  onSubmit = () => {
    if (this.isEdit) {
      const payload = {
        comment: this.comment,
      };
      this.commentService
        .updateComment(this.commentId, payload)
        .subscribe((res) => console.log);
      const index = this.comments.findIndex(
        (c) => c.commentId === this.commentId
      );
      this.comments[index].comment = this.comment;
    } else {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;

      const payload = {
        userId: this.userId,
        productId: this.product?.productId,
        commentator: this.fullName,
        rating: 0,
        commentDate: formattedDate,
        comment: this.comment,
      };

      this.commentService
        .addComment(payload)
        .subscribe((res) => console.log(res));
      this.comments = [payload, ...this.comments];
    }
    this.comment = '';
  };

  getFirstLetter = () => {
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      this.userId = JSON.parse(userLocalStorage).userId;
    }

    this.userListService.getUserById(this.userId).subscribe((data) => {
      this.firstLetter = data.firstName.charAt(0);
      const fullName = data.firstName + ' ' + data.lastName;
      const splitName = fullName.split(' ');
      for (let i = 0; i < splitName.length; i++) {
        this.fullName += this.maskName(splitName[i]) + ' ';
      }
    });
  };

  addToCart = () => {
    const payload = {
      userId: this.userId,
      productId: this.product?.productId,
      productName: this.product?.productName,
      category: this.product?.category,
      description: this.product?.description,
      quantity: this.quantity,
      price: this.product?.price,
      img: this.product?.img,
    };

    const updateQuantity = {
      quantity: this.quantity,
    };

    const prod = {
      productName: this.product?.productName,
    };

    this.cartService.addCartItem(payload).subscribe((res) => console.log(res));
    this.cartService.getCartItemByProductName(prod).subscribe((data: any) => {
      this.cartService
        .updateCartItem(data.id, updateQuantity)
        .subscribe((res) => console.log(res));
    });

    this.showCheck = true;
    setTimeout(() => {
      this.showCheck = false;
    }, 2000);
  };

  buyNow = () => {
    const prod = {
      productName: this.product?.productName,
    };

    this.cartService.getCartItemByProductName(prod).subscribe((data: any) => {
      const payload = {
        userId: this.userId,
        cartId: data.id,
        productId: this.product?.productId,
        productName: this.product?.productName,
        category: this.product?.category,
        description: this.product?.description,
        img: this.product?.img,
        quantity: this.quantity,
        price: this.product?.price,
      };
      this.checkoutService
        .addCheckout(payload)
        .subscribe((res) => console.log(res));
    });

    this.showSpinner = true;
    setTimeout(() => {
      this.router.navigate(['checkout']);
      this.showSpinner = false;
    }, 2000);
  };

  editComment = (id: number, comment: string) => {
    this.commentId = id;
    this.isEdit = true;
    this.comment = comment;
  };

  deleteComment = (id: number) => {
    this.commentService.deleteComment(id).subscribe(() => {});
    const filterComments = this.comments.filter((c) => c.commentId != id);
    console.log(filterComments);

    this.comments = filterComments;
  };

  maskName = (name: string) => {
    if (!name) return '';
    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  };

  clear = () => {
    this.comment = '';
  };

  // Product Quantity
  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  localString = (num: any) => {
    return num.toLocaleString();
  };

  aveIconStatus(index: number) {
    if (index < this.aveUserRating) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  // End--- Product Ratings and Review

  changeTab(tab: string) {
    this.activeTab = tab;
  }
}
