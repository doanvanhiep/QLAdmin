import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedataService {
    private khoahoc:any;
    private lophocphan:any;
    constructor() { }
    public shareDataKhoaHoc(IDKhoaHoc,dataKhoaHoc)
    {
        localStorage.setItem('idKhoaHoc',IDKhoaHoc);
        this.khoahoc=dataKhoaHoc;
    }
    public receiveDataKhoaHoc()
    {
        return this.khoahoc;
    }

    public shareDataLopHocPhan(IDLopHocPhan,dataLopHocPhan)
    {
        localStorage.setItem('idLopHocPhan',IDLopHocPhan);
        this.lophocphan=dataLopHocPhan;
    }
    public receiveDataLopHocPhan()
    {
        return this.lophocphan;
    }
}
