import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  transformCssProperty: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.onResize();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const scaleX = window.innerWidth / (window.innerWidth - 50) * 0.5;
    const scaleY = window.innerHeight / (window.innerHeight - 50) * 0.5;
    this.transformCssProperty = `scale(${scaleX}, ${scaleY})`;
  }

  navigateSingle(posY: string, posX: string): void {
    this.router.navigate(['..', 'single', posY, posX], { relativeTo: this.route });
  }
}
