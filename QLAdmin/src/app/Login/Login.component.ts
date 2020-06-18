import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login_serviceService } from '../service_auth/login_service.service';
import { first } from 'rxjs/operators';
import {CheckrouteService} from '../service/checkroute/checkroute.service'
@Component({
    selector: 'app-Login',
    templateUrl: './Login.component.html',
    styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    constructor(
        private checkroute:CheckrouteService,
        private router: Router,
        private formBuilder: FormBuilder,
        private loginService: Login_serviceService
    ) {
        if (loginService.isLogin) {
            this.router.navigate([`/${this.checkroute.getParentRouter()}`]);
            // var Quyen=this.loginService.getQuyen();
            // if(Quyen==0)this.router.navigate(['/admin']);
            // else if(Quyen==1) this.router.navigate(['/nv']);
            // else this.router.navigate(['/gv']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            taikhoan: 'admin',
            matkhau: 'admin'
        });
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    onSubmit() {
        this.loginService.login(this.f.taikhoan.value, this.f.matkhau.value)
            .pipe(first())
            .subscribe(
                data => {
                    //this.router.navigate(['']);
                    window.location.reload();
                    // if (data == 0 || data == 1) {
                    //   this.router.navigate(['/nv']);
                    // }
                    // else 
                    //if(data==2){
                    //   this.router.navigate(['/gv']);
                    // }
                    //else
                    //{
                    alert(data);
                    //}
                },
                error => {
                    // this.error = error;
                    // this.loading = false;
                });
    }

}
