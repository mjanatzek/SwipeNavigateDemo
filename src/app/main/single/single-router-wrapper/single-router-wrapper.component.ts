import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { pluck, take } from 'rxjs/operators';

@Component({
  selector: 'app-single-router-wrapper',
  templateUrl: './single-router-wrapper.component.html',
  styleUrls: ['./single-router-wrapper.component.scss']
})
export class SingleRouterWrapperComponent implements OnInit {

  posY$: Observable<string>;
  posX$: Observable<string>;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.posY$ = this.route.params.pipe(
      pluck('posY')
    );

    this.posX$ = this.route.params.pipe(
      pluck('posX')
    );
  }

  ngOnInit(): void {
  }

  swipeEvent(direction: string): void {
    combineLatest([this.posY$, this.posX$]).pipe(take(1)).subscribe(([posY, posX]) => {
      if (direction === 'left' && posX === 'left') {
        this.router.navigate(['..', 'right'], { relativeTo: this.route });
      }

      if (direction === 'right' && posX === 'right') {
        this.router.navigate(['..', 'left'], { relativeTo: this.route });
      }

      if (direction === 'up' && posY === 'top') {
        this.router.navigate(['../..', 'bottom', posX], { relativeTo: this.route });
      }

      if (direction === 'down' && posY === 'bottom') {
        this.router.navigate(['../..', 'top', posX], { relativeTo: this.route });
      }
    });
  }

  navigateAll(): void {
    this.router.navigate(['../../..', 'all'], { relativeTo: this.route });
  }
}
