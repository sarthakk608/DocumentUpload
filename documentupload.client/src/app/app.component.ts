import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  ngOnInit(): void {
      throw new Error('Method not implemented.');
  }


export class AppComponent {

  constructor(private http: HttpClient) {}




  title = 'documentupload.client';
}
