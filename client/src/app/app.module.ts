import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/service/auth-guard.service';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { HomeComponent } from './modules/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './auth/service/token-interceptor.service';
import { BaseUrlInterceptorService } from './service/base-url-interceptor/base-url-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'equipment-list', pathMatch: 'full' },
  {
    path: 'signIn',
    loadChildren: () =>
      import('./auth/sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: 'equipment-list',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/equipment-list/equipment-list.module').then(
            (m) => m.EquipmentListModule
          ),
      },
    ],
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
