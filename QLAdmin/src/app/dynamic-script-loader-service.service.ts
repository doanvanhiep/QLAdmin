import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}
export const ScriptStore: Scripts[] = [
  { name: 'jquerydataTablesminjs', src: '../assets/vendor/datatables/jquery.dataTables.min.js'},
  { name: 'dataTablesbootstrap4minjs', src: '../assets/vendor/datatables/dataTables.bootstrap4.min.js'},
  { name: 'datatablesdemojs', src: '../assets/js/demo/datatables-demo.js'},
  { name: 'sbadmin2minjs', src: '../assets/js/sb-admin-2.min.js'},
];

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderServiceService {
  private scripts: any = {};
  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }
  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (true) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
          script.onreadystatechange = () => {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            }
          };
        } else {  //Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          };
        }
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        console.log("Đã load rồi");
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }
}
