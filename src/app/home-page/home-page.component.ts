import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  todayDate!: Date;
  endDate!: Date;
  remainingDays!: number;


  ngOnInit(): void {
    this.todayDate = new Date();
    this.endDate = new Date(this.todayDate.getFullYear(), 1, 1); // February 1st of the current year

   
    this.endDate.setDate(15 + (5 - this.endDate.getDay())); // 15th day + remaining days to reach Friday

    // Calculate remaining days
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    this.remainingDays = Math.round((this.endDate.getTime() - this.todayDate.getTime()) / oneDay);
  }



}