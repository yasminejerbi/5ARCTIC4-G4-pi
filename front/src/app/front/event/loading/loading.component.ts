import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  isLoading: boolean = false;

  constructor() { }
  startLoading(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Adjust the timeout as needed
    
  }

  ngOnInit(): void {
    this.startLoading();
    
}
}
