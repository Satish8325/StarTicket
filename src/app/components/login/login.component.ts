import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Login_response } from 'src/app/core/models/login_respose.model';
import { LocalStorageService } from 'src/app/core/services/Common/localstorage.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ToasteralertService } from 'src/app/core/services/toasteralert.Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  LoginDetails: any;
  login_response: any;
  token: any;
  diablelogin: boolean = false;
  loginbtn = 'Log In';
  visible: boolean = false;
  changetype: boolean = true;
  Email: any;
  Password: any;
  btnClick: boolean = false;
  private translate = inject(TranslateService);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public toastralert: ToasteralertService,
    private loginservice: LoginService,
    public localStorageService: LocalStorageService,
    
  ) { }





  async Login() {
    this.diablelogin = true;
    this.loginbtn = 'Processing...';
    // this.LoginDetails.markAllAsTouched();
    // if (this.LoginDetails?.valid) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    if (this.Email == "" || this.Email == null || this.Email == undefined) {
      this.toastralert.toastrwarnning('Please Enter Email ');
      this.loginbtn = 'Log In';
      this.diablelogin = false;
      this.btnClick = true;
      return false;
    } else if (this.Password == "" || this.Password == null || this.Password == undefined) {
      this.loginbtn = 'Log In';
      this.diablelogin = false;
      this.btnClick = true;
      return false
    } else if (!emailPattern.test(this.Email) && !phonePattern.test(this.Email)) {
      this.toastralert.toastrerror('Wrong Credentials');
      this.loginbtn = 'Log In';
      this.diablelogin = false;
      this.btnClick = true;
      return false
    }
    else {
      let formData = {
        EmailOrPhoneNumber: this.Email,
        Password: this.Password
      }
      console.log(formData);
      this.loginservice.userAuthentication(formData).subscribe(
        (results) => {
          if (results) {
            console.log(results);
            this.diablelogin = false;
            this.btnClick = false;
            if (results.flag && results.token) {
              this.loginbtn = 'Authenticating...';
              let loginResponse: Login_response;
              loginResponse = results;
              loginResponse.accessToken = results.token;
              //Storing API response.
              this.localStorageService.saveData("star_token_response", JSON.stringify(loginResponse));
              // localStorage.setItem("sitebridge_token_response", JSON.stringify(results));
              this.loginservice.setloginuserdeatils(loginResponse);
              //Stroing Token Claims.
              const token_claims = this.loginservice.decodedToken();
              this.localStorageService.saveData("star_token_claims", JSON.stringify(token_claims));
              // localStorage.setItem("sitebridge_token_claims", JSON.stringify(token_claims));
              this.loginservice.setToken_Claims(token_claims);

             var new1 = this.localStorageService.getData("star_token_claims");
              this.localStorageService.getData("star_token_claims");
              console.log(new1);

              this.router.navigate(['/contractList']);
              
            } else {
              this.loginbtn = 'Log In';
              this.toastralert.toastrerror(results.message);
            }
          }
        },
        (err) => {
          this.diablelogin = false;
          this.loginbtn = 'Log In';
          this.btnClick = false
          this.toastralert.toastrerror(this.translate.instant('The_Email_or_Password_is_incorrect'));
        }
      );
    }
  }

}
