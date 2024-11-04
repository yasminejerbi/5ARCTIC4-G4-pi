import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Comment } from '../model/comment';
import { CommentService } from '../services/comment.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  constructor(
    
    public CommentService: CommentService,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private service: CommentService,
    
  ) {}
  badWords: string[] = ['badword1', 'badword2', '...'];
  comments!:Comment[]
  id!: number;
  CommentForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(3)]),
    
  });
  ngOnInit() {
    this.comments = []; // Initialize as an empty array
    this.getcomments();
  }
  
  
  getcomments(): void {
    this.id = this.data.id;
    this.CommentService.getCommentsByForum(this.id).subscribe((data: any) => {
      this.comments = data; // Assign even an empty array
      console.log(this.comments);
    },
    (error) => {
      console.error('Error fetching comments:', error);
      // Handle errors (e.g., display error message)
    });
  }
  addcomment() {
    if (this.CommentForm.valid && this.containsBadWords(this.CommentForm.value)) {
      console.error('Forum contains bad words. Please remove them.');
      return; // Prevent submission if bad words are found
    }

    if (this.CommentForm.valid) {
      const formData = this.CommentForm.value;
      const commentData: any = {
        content: formData.content,
        
      };
    
      this.service.addComment(commentData).subscribe(
        (response: any) => {
          console.log('comment ajouté avec succès :', response);
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding comment:', error);
          // Handle specific errors (e.g., display error message to user)
      }
      );
    }
  }
  containsBadWords(formData: any): boolean {
    const content = formData.content.toLowerCase();
   

    return this.badWords.some((badWord) =>
      content.includes(badWord) 
    );
  }
}
