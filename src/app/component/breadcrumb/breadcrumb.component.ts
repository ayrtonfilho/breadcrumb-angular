import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent {

  private readonly _breadcrumbs$ = new BehaviorSubject([]);
  readonly breadcrumbs$: Observable<any[]>;

  constructor(private router: Router) {
    this.breadcrumbs$ = this._breadcrumbs$.asObservable();

    this.router.events.pipe(
      
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(event => {
      
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: [] = [];
      this.addBreadcrumb(root, [], breadcrumbs);

      this._breadcrumbs$.next(breadcrumbs);
    });
  }


  private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: any[]) {
    if (route) {
      
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));

      
      if (route.data['breadcrumb']) {
        const breadcrumb = {
          label: this.getLabel(route.data),
          url: '/' + routeUrl.join('/')
        };
        breadcrumbs.push(breadcrumb);
      }

      
      this.addBreadcrumb(route.firstChild!, routeUrl, breadcrumbs);
    }
  }
  

  private getLabel(data: Data) {
    return typeof data['breadcrumb'] === 'function' ? data['breadcrumb'](data): data['breadcrumb'];
  }

}
