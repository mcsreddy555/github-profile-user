import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
//import { error } from 'protractor';
//import { error } from 'console';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-github-app',
  templateUrl: './github-app.component.html',
  styleUrls: ['./github-app.component.css']
})
export class GithubAppComponent implements OnInit {
  public githubUserQuery:String;
  public githubProfile:any;
  public githubRepos:any[];
  public errMsg:string;


  constructor(private githubService:GithubService,
              private ngxSpinner:NgxSpinnerService) { }

  public searchUser(){
    if(this.githubUserQuery === undefined || this.githubUserQuery ==''){
      alert('Please enter user name');
      return;
    }
    //display the spinner before server call
    this.ngxSpinner.show();
    //to get github profile
    this.githubService.getProfile(this.githubUserQuery).subscribe((data)=>{
      this.githubProfile=data;
    },(error) => {
      this.errMsg;
    });
      
    

    //to get github profile
    this.githubService.getRepos(this.githubUserQuery).subscribe( (data) => {
        this.githubRepos=data;
        //stop the spinner display
        this.ngxSpinner.hide(); 
    } , 
    (error)=>{
        this.errMsg=error;
    }
    );

  }

  ngOnInit(): void {
  }

}
