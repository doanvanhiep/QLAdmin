import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { DasboardComponent } from './dasboard/dasboard.component';

const routes: Routes = [
  {path:'',redirectTo:'/nv',pathMatch:'full'},
  {
    path: 'nv',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: DasboardComponent
      }
    ]
  }
];
@NgModule({
  // declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
