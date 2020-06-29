import { Component, OnInit } from "@angular/core";
import { DynamicScriptLoaderServiceService } from "../../dynamic-script-loader-service.service";
@Component({
  selector: "app-doanhthu",
  templateUrl: "./doanhthu.component.html",
  styleUrls: ["./doanhthu.component.css"],
})
export class DoanhthuComponent implements OnInit {
  constructor(private dynamicScriptLoader: DynamicScriptLoaderServiceService) {}

  ngOnInit(): void {
    this.loadScripts();
  }
  form: any;
  p: any;
  header = ["First", "Last", "Address"];
  filterData = [
    {
      firstName: "Celestine",
      lastName: "Schimmel",
      address: "7687 Jadon Port",
    },
    {
      firstName: "Johan",
      lastName: "Ziemann PhD",
      address: "156 Streich Ports",
    },
    {
      firstName: "Lizzie",
      lastName: "Schumm",
      address: "5203 Jordon Center",
    },
    {
      firstName: "Gavin",
      lastName: "Leannon",
      address: "91057 Davion Club",
    },
    {
      firstName: "Lucious",
      lastName: "Leuschke",
      address: "16288 Reichel Harbor",
    },
  ];
  //load script
  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader
      .load("jquerydataTablesminjs")
      .then((data) => {
        // You can load multiple scripts by just providing the key as argument into load method of the service
        this.dynamicScriptLoader
          .load("dataTablesbootstrap4minjs")
          .then((data) => {
            // You can load multiple scripts by just providing the key as argument into load method of the service
            this.dynamicScriptLoader
              .load("datatablesdemojs")
              .then((data) => {
                this.dynamicScriptLoader
                  .load("sbadmin2minjs")
                  .then((data) => {})
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }
}
