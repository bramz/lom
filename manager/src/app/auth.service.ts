import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const AUTH_API = 'http://localhost:8080/api/auth'

const httpOptions = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' })
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(
        private http: HttpClient
    ) {
    }

    login(email: string, password: string) Observable<any> {
        return this.http.post(AUTH_API + 'signin', {
            username,
            password
        })

    }
}