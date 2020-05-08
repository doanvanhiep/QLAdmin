import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login_serviceService } from '../service_auth/login_service.service';
import { first } from 'rxjs/operators';
@Component({
    selector: 'app-Login',
    templateUrl: './Login.component.html',
    styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private loginService: Login_serviceService
    ) {
        if (loginService.isLogin) {
            this.router.navigate(['/nv']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            taikhoan: '',
            matkhau: ''
        });
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    onSubmit() {
        this.loginService.login(this.f.taikhoan.value, this.f.matkhau.value)
            .pipe(first())
            .subscribe(
                data => {
                    //this.router.navigate(['/nv']);
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
