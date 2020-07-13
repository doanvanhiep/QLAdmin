import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckrouteService } from '../service/checkroute/checkroute.service';
@Component({
  selector: 'app-NotFoundComponent',
  templateUrl: './NotFoundComponent.component.html',
  styleUrls: ['./NotFoundComponent.component.css']
})
export class NotFoundComponentComponent implements OnInit {

  parentRouter: any = "admin";
  constructor(
    private checkrouteService: CheckrouteService,
    private activatedRoute: ActivatedRoute,
    private router: Router, ) {
    this.checkRoute();
  }

  ngOnInit() {
  }
  checkRoute() {
    this.parentRouter = this.checkrouteService.getParentRouter();
    this.activatedRoute.parent.url.subscribe((urlPath) => {
      const url = urlPath[urlPath.length - 1].path;
      if (this.parentRouter != url)
        this.router.navigate([this.parentRouter]);
    })
  }
}
