import { Component, OnInit } from '@angular/core';
// Service
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderServiceService) { }

  ngOnInit() {


    // Just call your load scripts function with scripts you want to load
    this.loadScripts();




    // console.log('preparing to load...')
    // const dynamicScripts = [
    //   '../../assets/vendor/datatables/jquery.dataTables.min.js',
    //   '../../assets/vendor/datatables/dataTables.bootstrap4.min.js',
    //   '../../assets/js/demo/datatables-demo.js'
    // ];
    // for (let i = 0; i < dynamicScripts.length; i++) {
    //     let node = document.createElement('script');
    //     node.src = dynamicScripts[i];
    //     node.type = 'text/javascript';
    //     node.async = true;
    //     node.charset = 'utf-8';
    //     document.getElementsByTagName('head')[0].appendChild(node);
    // }
    // console.log('preparing to load...')
  }
private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('jquerydataTablesminjs','dataTablesbootstrap4minjs','datatablesdemojs').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }
}
