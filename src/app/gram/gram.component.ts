import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gram',
  templateUrl: './gram.component.html',
  styleUrls: ['./gram.component.css']
})
export class GramComponent implements OnInit {
   summary: string;
   description: string;
   crying: string;
   murder: string;
   trigger: string;
   post: string;
   comfortable: string;
   light: string;
   percentage: string;

  constructor() {
     this.summary = 'ripple';
     this.description = 'Somewhere in the world';
     this.crying = 'Liked by';
     this.murder = 'ripple';
     this.trigger = '9 HOURS AGO';
     this.post = 'Post';
     this.comfortable = 'emekaanagbogu';
     this.light = 'kevin';
     this.percentage = 'baller';
  }

  ngOnInit(): void {
  }

}
