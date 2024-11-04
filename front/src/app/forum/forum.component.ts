import { Component, OnInit, ViewChild } from '@angular/core';
import { Forum } from '../model/forum';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ForumService } from '../services/forum.service';
import { AjouterForumComponent } from 'src/app/ajouter-forum/ajouter-forum.component';
import { UpdateForumComponent } from '../update-forum/update-forum.component';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Comment } from '../model/comment';
import { MatPaginator } from '@angular/material/paginator';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  index: any;
searchInput: any;

  constructor(
    public dialog: MatDialog,
    public forumService: ForumService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private _snackBar: MatSnackBar 
  ) {}

  forums: Forum[] = [];

  ngOnInit() {
    this.loadForums();
    
  }

  loadForums(): void {
    this.forumService.getAll().subscribe((res) => {
      this.forums = res;
      this.cdRef.detectChanges(); // Update the paginator after data is loaded
    });
  }

  likeForum(idForum: number): void {
    this.forumService.likeForum(idForum).subscribe({
      next: (response) => {
        console.log('Voted like successfully.');
        window.location.reload(); // Force the page to reload
      },
      error: (error) => console.error('Error voting like:', error),
    });
  }

  dislikeForum(idForum: number): void {
    this.forumService.dislikeForum(idForum).subscribe({
      next: (response) => {
        console.log('Voted dislike successfully.');
        window.location.reload(); // Force the page to reload
      },
      error: (error) => console.error('Error voting like:', error),
    });
  }

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  openAddForumDialog(): void {
    const dialogRef = this.dialog.open(AjouterForumComponent, {
      width: '500px',
      height: '300px', // Adjust the width as needed
      // You can add more configuration options here
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // You can handle any actions after the dialog is closed here
      this.loadForums(); // Reload forums after adding a new one
    });
  }

  openupdateForumDialog(id: number): void {
    const dialogRef = this.dialog.open(UpdateForumComponent, {
      width: '500px',
      height: '300px', // Adjust the width as needed
      // You can add more configuration options here
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // You can handle any actions after the dialog is closed here
      this.loadForums(); // Reload forums after updating one
    });
  }

  opencommentForumDialog(id: number): void {
    const dialogRef = this.dialog.open(CommentComponent, {
      width: '500px',
      height: '300px', // Adjust the width as needed
      // You can add more configuration options here
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // You can handle any actions after the dialog is closed here
    });
  }

  deleteForum(id: number) {
    this.forumService.deleteForum(id).subscribe({
      next: () => {
        console.log('Forum supprimé avec succès');
          // Refresh the window after 5 seconds
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        this._snackBar.open('Forum supprimé avec succès!', '', {
          duration: 2000, // Display the notification for 2 seconds
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

      },
      error: (error) => {
        console.error('Erreur lors de la suppression du forum :', error);
        // Handle error (e.g., display error message to user)
      },
    });
  }
 
 

 
}
