import { Component, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewChecked {
  title = 'Angular Chat';
  userQuery = '';
  response = '';
  isLoading = false;
  error = '';
  
  @ViewChild('chatArea') private chatAreaRef!: ElementRef;
  
  private http = inject(HttpClient);
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  scrollToBottom(): void {
    try {
      if (this.chatAreaRef) {
        this.chatAreaRef.nativeElement.scrollTop = this.chatAreaRef.nativeElement.scrollHeight;
      }
    } catch (err) { }
  }
  
  sendMessage() {
    if (!this.userQuery.trim()) {
      return;
    }
    
    this.isLoading = true;
    this.error = '';
    
    // Store the query before clearing it
    const query = this.userQuery;
    this.userQuery = ''; // Clear input immediately for better UX
    
    this.http.post<any>('http://0.0.0.0:5002/chat-test', { userprompt: query })
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.response = data.response || data.markdown || data.text || 'No response received';
        },
        error: (err) => {
          this.error = err;
          console.error('API error:', err);
        }
      });
  }
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      
      // Add more context based on status code
      if (error.status === 0) {
        errorMessage = 'Cannot connect to the server. Please check your internet connection.';
      } else if (error.status === 404) {
        errorMessage = 'The requested API endpoint was not found.';
      } else if (error.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
    }
    
    return throwError(() => errorMessage);
  }
}
