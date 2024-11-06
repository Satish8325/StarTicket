import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { ContractsListComponent } from './contracts-list/contracts-list.component';
import { ContractComponent } from './contract/contract.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [

  // {
  //   path: 'login', component: LoginComponent
  // },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
    path: 'contractList', component: ContractsListComponent
  },
  {
    path: 'contract', component: ContractComponent
  },
  {
    path: 'settings', component: SettingsComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
