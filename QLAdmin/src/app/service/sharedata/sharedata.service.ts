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
        this.khoahoc=dataKhoaHoc;
    }
    public receiveDataKhoaHoc()
    {
        return this.khoahoc;
    }

    public shareDataLopHocPhan(IDLopHocPhan,dataLopHocPhan)
    {
        this.lophocphan=dataLopHocPhan;
    }
    public receiveDataLopHocPhan()
    {
        return this.lophocphan;
    }
}
