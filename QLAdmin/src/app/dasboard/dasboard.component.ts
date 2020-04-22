import { Component, OnInit } from '@angular/core';
// Service
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
import { DasboardService } from '../service/dasboard.service';
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {

  constructor(
    private dynamicScriptLoader: DynamicScriptLoaderServiceService,
    private dasboardService: DasboardService
  ) { }

  ngOnInit() {
    // Just call your load scripts function with scripts you want to load
    this.loadScripts();
  }
  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('jquerydataTablesminjs').then(data => {
      // You can load multiple scripts by just providing the key as argument into load method of the service
      this.dynamicScriptLoader.load('dataTablesbootstrap4minjs').then(data => {
        // You can load multiple scripts by just providing the key as argument into load method of the service
        this.dynamicScriptLoader.load('datatablesdemojs').then(data => {
        }).catch(error => console.log(error));
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }
  checkValue(a: any, n: number) {
    this.dasboardService.test()
    .pipe()
    .subscribe(data=>{
      console.log(data);
    });
    console.log(a.target.id, n);
    console.log(a, n);
  }
}
