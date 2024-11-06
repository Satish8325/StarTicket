import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'src/app/core/services/Common/localstorage.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss']
})
export class ContractsListComponent {
  token_response:any=null;
  constructor(private http: HttpClient,private localService:LoginService,private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    const jwtHelper = new JwtHelperService();
    this.token_response=this.localService.getToken();
console.log(jwtHelper.decodeToken(this.token_response),"dashboard token_response")
  }
}
