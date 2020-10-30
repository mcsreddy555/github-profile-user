import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
//import { count } from 'console'; 
import { Observable, throwError } from 'rxjs';
import { catchError, count, retry } from 'rxjs/operators';
import { CLIENT_ID, CLIENT_SECRET } from '../credentials/GithubCred';

@Injectable({
    providedIn:'root'
})
export class GithubService{
    constructor(private http:HttpClient){}
    //github profiles
    public getProfile(searchQuery):Observable<any>{
        let dataUrl=`https://api.github.com/users/${searchQuery}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
        return this.http.get(dataUrl).pipe(
            retry(1),
            catchError(this.handleErrors)

            
        );
    }
    //github repos
    public getRepos(searchQuery):Observable<any[]>{
        let dataUrl=`https://api.github.com/users/${searchQuery}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
        return this.http.get<any[]>(dataUrl).pipe(
            retry(1),
            catchError(this.handleErrors)
            
            
        );
    }

    public handleErrors(error:HttpErrorResponse){
        let errMsg:string;
        if(error.error instanceof ErrorEvent){
            //client side error
            errMsg=`MESSAGE:${error.error.message}`;
        }
        else{
            //server side error
            errMsg=`STATUS:${error.status} MESSAGE:${error.message}`
        }
        return throwError(errMsg);
    };

}