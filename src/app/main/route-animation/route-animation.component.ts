import { Component, OnInit } from '@angular/core';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, NavigationEnd, Params, Router, UrlSegment } from '@angular/router';
import { bufferCount, filter, map, startWith, switchMap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

const animationTime = '150ms';

@Component({
  selector: 'app-route-animation',
  templateUrl: './route-animation.component.html',
  styleUrls: ['./route-animation.component.scss'],
  animations: [
    trigger('horizontalAnimation', [
      transition('left => right', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0
          })
        ]),
        query(':enter', [
          style({ left: '100%' })
        ]),
        group([
          query(':leave', [
            animate(`${animationTime} ease-out`, style({ left: '-100%' }))
          ]),
          query(':enter', [
            animate(`${animationTime} ease-out`, style({ left: '0%' }))
          ])
        ])
      ]),
      transition('right => left', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0
          })
        ]),
        query(':enter', [
          style({ left: '-100%' })
        ]),
        group([
          query(':leave', [
            animate(`${animationTime} ease-out`, style({ left: '100%' }))
          ]),
          query(':enter', [
            animate(`${animationTime} ease-out`, style({ left: '0%' }))
          ])
        ])
      ])
    ]),
    trigger('verticalAnimation', [
      transition('bottom => top', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0
          })
        ]),
        query(':enter', [
          style({ top: '-100%' })
        ]),
        group([
          query(':leave', [
            animate(`${animationTime} ease-out`, style({ top: '100%' }))
          ]),
          query(':enter', [
            animate(`${animationTime} ease-out`, style({ top: '0%' }))
          ])
        ])
      ]),
      transition('top => bottom', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0
          })
        ]),
        query(':enter', [
          style({ top: '100%' })
        ]),
        group([
          query(':leave', [
            animate(`${animationTime} ease-out`, style({ top: '-100%' }))
          ]),
          query(':enter', [
            animate(`${animationTime} ease-out`, style({ top: '0%' }))
          ])
        ])
      ]),
    ]),
    trigger('pageAnimation', [
      transition('all => single', [
        query(':enter', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'scale(.5, .5)',
            transformOrigin: '{{posYNew}} {{posXNew}}',
            background: 'white'
          })
        ]),
        group([
          query(':enter', [
            animate(`${animationTime} ease-out`, style({ transform: 'scale(1, 1)' }))
          ])
        ])
      ], { params: { posYNew: 'top', posXNew: 'left' } }),
      transition('single => all', [
        query(':leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'scale(1, 1)',
            transformOrigin: '{{posYOld}} {{posXOld}}',
            background: 'white',
            zIndex: 1
          })
        ]),
        group([
          query(':leave', [
            animate(`${animationTime} ease-out`, style({ transform: 'scale(.5, .5)' }))
          ])
        ])
      ], { params: { posYOld: 'top', posXOld: 'left' } })
    ])
  ]
})
export class RouteAnimationComponent implements OnInit {

  pageAnimationState$: Observable<string>;
  horizontalAnimationState$: Observable<string>;
  verticalAnimationState$: Observable<string>;
  pageAnimationParams$: Observable<{ posXNew: string, posYNew: string, posXOld: string, posYOld: string }>;

  constructor(private router: Router, private route: ActivatedRoute) {
    const routerState$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      startWith(undefined),
      switchMap(() => combineLatest([this.route.firstChild.params, this.route.firstChild.url]))
    );

    this.pageAnimationState$ = routerState$.pipe(
      map(([params, url]: [Params, UrlSegment[]]) => {
        return url[0].path;
      })
    );

    this.horizontalAnimationState$ = routerState$.pipe(
      map(([params, url]: [Params, UrlSegment[]]) => {
        if (url[0].path === 'all') {
          return '';
        }

        return params.posX;
      })
    );

    this.verticalAnimationState$ = routerState$.pipe(
      map(([params, url]: [Params, UrlSegment[]]) => {
        if (url[0].path === 'all') {
          return '';
        }

        return params.posY;
      }),
    );

    const horizontalAnimationStateBuffer$ = this.horizontalAnimationState$.pipe(
      bufferCount(2, 1)
    );

    const verticalAnimationStateBuffer$ = this.verticalAnimationState$.pipe(
      bufferCount(2, 1)
    );

    this.pageAnimationParams$ = combineLatest([verticalAnimationStateBuffer$, horizontalAnimationStateBuffer$]).pipe(
      map(([verticalStateBuffer, horizontalStateBuffer]: [[string, string], [string, string]]) => {
        return {
          posXNew: horizontalStateBuffer[1],
          posYNew: verticalStateBuffer[1],
          posXOld: horizontalStateBuffer[0],
          posYOld: verticalStateBuffer[0]
        };
      })
    );
  }

  ngOnInit(): void {
  }

}
