import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-doanhthu",
  templateUrl: "./doanhthu.component.html",
  styleUrls: ["./doanhthu.component.css"],
})
export class DoanhthuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
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
}
