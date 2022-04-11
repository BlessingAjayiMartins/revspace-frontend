import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-view-profile-component',
  templateUrl: './view-profile-component.component.html',
  styleUrls: ['./view-profile-component.component.css']
})
export class ViewProfileComponentComponent implements OnInit {
  url: any; //Angular 11, for stricter type
  msg = "";

  // to get to this component the path would be viewprofile/:userid

  constructor(private route: ActivatedRoute, private userHTTP: UserService, private loginUser: LoginService, private imageService:ImageService) { }

  // user:User= new User(1,'email','Ryan','Schlientz',120395,2017,'https://github.com/Revature-RevSpace/revspace-application','Senior Trainer','West Virginia',"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
  urlLink:string;

  user: User;

  //NGIFs
  expandThis=false;
  show=false;

  expand(){
    this.expandThis=true;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userid = Number(routeParams.get('userId'));
    console.log(userid);
    const authToken:string = this.loginUser.getLoginInfo().authToken;
    const myHeaders:HttpHeaders = new HttpHeaders({
      'Authorization': authToken
    });
    this.userHTTP.getUserById(userid,myHeaders).subscribe(
      (response)=> {
        console.log(response);
        this.user = response;
      }
    )
    // here will load the user, so load user and assigned user
    // here will also fill the user with data to be displayed
  }
  
  //CODE FOR IMGBB
  onInput(e: Event){
    const input = e.target as HTMLInputElement;
    this.imageService.upload(input.files[0])
    .subscribe(url => {
      console.log(url);
      this.urlLink = url;
    });

    //CODE TO DISPLAY IMAGE AS CLICKED
    if(input.files[0]){
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0])
        reader.onload = (input:any) =>{
          this.urlLink = input.result
          this.show=true;
        }
      }
  }

}
