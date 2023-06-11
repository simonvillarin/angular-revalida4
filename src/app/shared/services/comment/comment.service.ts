import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/v1';

  getAllComment = (id: number): Observable<Comment[]> => {
    return this.http.get<Comment[]>(`${this.BASE_URL}/comments/${id}`);
  };

  addComment = (comment: any) => {
    return this.http.post(`${this.BASE_URL}/comment`, comment);
  };

  updateComment = (id: number, comment: any) => {
    return this.http.put(`${this.BASE_URL}/comment/${id}`, comment);
  };

  deleteComment = (id: number) => {
    return this.http.delete(`${this.BASE_URL}/comment/${id}`);
  };
}
