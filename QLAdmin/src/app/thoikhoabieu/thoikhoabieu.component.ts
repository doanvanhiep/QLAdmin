import { Component, OnInit } from '@angular/core';
import { ThoikhoabieuService } from '../service/thoikhoabieu/thoikhoabieu.service';
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
@Component({
    selector: 'app-thoikhoabieu',
    templateUrl: './thoikhoabieu.component.html',
    styleUrls: ['./thoikhoabieu.component.css']
})
export class ThoikhoabieuComponent implements OnInit {

    numberweekofyear: any;
    numbercurrentofweek: any;
    begindate: any;
    enddate: any;
    thoikhoabieu: any;
    constructor(
        private thoikhoabieuServer: ThoikhoabieuService,
        private dynamicScriptLoader: DynamicScriptLoaderServiceService,
    ) { }

    ngOnInit() {
        this.numberweekofyear = Array.from(Array(52).keys());
        this.getCurrentNumberofWeek();
        this.getBeginAndEndDate(this.numbercurrentofweek);
        this.getThoiKhoaBieu(1);
        this.loadScripts();
    }
    getWeek(event) {
        this.numbercurrentofweek = +event;
        this.getBeginAndEndDate(this.numbercurrentofweek);
    }
    getCurrentNumberofWeek() {
        var date = new Date();
        var onejan = new Date(date.getFullYear(), 0, 1);
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var sub = today.getTime() - onejan.getTime();
        var dayOfYear = ((sub) / 86400000) + 1;
        this.numbercurrentofweek = (Math.ceil(dayOfYear / 7));
    }
    getBeginAndEndDate(numberofweek) {
        var numberofadddate = (numberofweek * 7) - 1;
        var date = new Date();
        var endDate = new Date(date.getFullYear(), 0, 1);
        endDate.setDate(endDate.getDate() + numberofadddate);
        this.enddate = endDate;
        var beinDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        beinDate.setDate(beinDate.getDate() - 6)
        this.begindate = beinDate;
    }
    getThoiKhoaBieu(IDGiangVien) {
        this.thoikhoabieuServer.getThoiKhoaBieu(IDGiangVien)
            .pipe()
            .subscribe(res => {
                this.thoikhoabieu = res.result.data;
                console.log(this.thoikhoabieu);
            })
    }
    //load script
    private loadScripts() {
        // You can load multiple scripts by just providing the key as argument into load method of the service
        this.dynamicScriptLoader.load('jquerydataTablesminjs').then(data => {
            // You can load multiple scripts by just providing the key as argument into load method of the service
            this.dynamicScriptLoader.load('dataTablesbootstrap4minjs').then(data => {
                // You can load multiple scripts by just providing the key as argument into load method of the service
                this.dynamicScriptLoader.load('datatablesdemojs').then(data => {
                    this.dynamicScriptLoader.load('sbadmin2minjs').then(data => {
                    }).catch(error => console.log(error));
                }).catch(error => console.log(error));
            }).catch(error => console.log(error));
        }).catch(error => console.log(error));
    }
}
