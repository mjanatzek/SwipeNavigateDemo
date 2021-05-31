import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  @Input() posY: string;
  @Input() posX: string;

  constructor() { }

  ngOnInit(): void {
  }

}
