import { Component, OnInit } from '@angular/core';
import { ThoikhoabieuService } from '../service/thoikhoabieu/thoikhoabieu.service';
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckrouteService } from '../service/checkroute/checkroute.service';
import {GiangvienService} from '../service/giangvien/giangvien.service';
@Component({
    selector: 'app-thoikhoabieu',
    templateUrl: './thoikhoabieu.component.html',
    styleUrls: ['./thoikhoabieu.component.css']
})
export class ThoikhoabieuComponent implements OnInit {
    idGiangVien:any=-1;
    parentRouter: any = "admin";
    numberweekofyear: any;
    numbercurrentofweek: any;
    begindate: any;
    enddate: any;
    thoikhoabieu: any;
    constructor(
        private giangvienService:GiangvienService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private checkrouteService: CheckrouteService,
        private datepipe: DatePipe,
        private thoikhoabieuServer: ThoikhoabieuService,
        private dynamicScriptLoader: DynamicScriptLoaderServiceService,
    ) { this.checkRoute(); }

    ngOnInit() {
        this.numberweekofyear = Array.from(Array(52).keys());
        this.getCurrentNumberofWeek();
        this.getBeginAndEndDate(this.numbercurrentofweek);
        this.giangvienService.getGiangVienByTenTaiKhoan()
        .pipe()
        .subscribe(res=>{
            if(res.result.error)
            {
                alert("Hiện tại không thể truy cập thời khóa biểu.Liên hệ quản trị để được xử lý");
                return;
            }
            else
            {
                this.idGiangVien=res.result.data[0].IDGiangVien;
                this.getThoiKhoaBieu(this.idGiangVien, this.begindate, this.enddate);
            }
        });
        this.loadScripts();
    }
    getWeek(event) {
        this.numbercurrentofweek = +event;
        this.getBeginAndEndDate(this.numbercurrentofweek);
        this.getThoiKhoaBieu(this.idGiangVien, this.begindate, this.enddate);
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
    getThoiKhoaBieu(IDGiangVien, begindate, enddate) {
        if(IDGiangVien<1)
        return;
        this.thoikhoabieuServer.getThoiKhoaBieu(IDGiangVien, this.datepipe.transform(begindate, "yyyy-MM-dd"), this.datepipe.transform(enddate, "yyyy-MM-dd"))
            .pipe()
            .subscribe(res => {
                this.thoikhoabieu = res.result.data;
            })
    }
    checkRoute() {
        this.parentRouter = this.checkrouteService.getParentRouter();
        this.activatedRoute.parent.url.subscribe((urlPath) => {
            const url = urlPath[urlPath.length - 1].path;
            if (this.parentRouter != url)
                this.router.navigate([this.parentRouter]);
        })
    }
    //load script
    private loadScripts() {
        this.dynamicScriptLoader.load('sbadmin2minjs').then(data => {
        }).catch(error => console.log(error));
    }
}
