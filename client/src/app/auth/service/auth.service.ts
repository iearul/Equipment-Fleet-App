import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) { }

  get loggedIn(): any {
    const state = localStorage.getItem("auth");
    if (!state) {
      return null;
    }
    return JSON.parse(state);
  }

  signIn(credentials: { email: string; password: string }): Observable<any> {
    const formData = new FormData();
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    return this.httpClient.post("/auth/login", formData).pipe(tap((res: any) => {
      if (res.token) {
        const obj = { email: credentials.email, isLoggedIn: true, ...res };
        localStorage.setItem("auth", JSON.stringify(obj));
        this.router.navigateByUrl("/"); // declare this inside sucsess response
      }
    }));

  }

  signOut(): void {
    localStorage.clear();
  }
}
