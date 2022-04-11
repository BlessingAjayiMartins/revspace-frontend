import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ImageService {

  //CODE FOR IMGBB 
  private apiKey: string = '54a88bf42f4fe7281b1ba9ba2c242ecb';


  constructor(private http:HttpClient) { }
 
 //CODE FOR IMGBB UPLOAD
 upload(file: File): Observable<string>{
   const formData = new FormData();
   formData.append('image', file);
   return this.http.post<any>('https://api.imgbb.com/1/upload', formData, {params: {key:this.apiKey}})
   .pipe(map((response)=>response['data']['url']));      
 }
 
  // CODE FOR UDATING PROFILE IMAGE
  // editProfileImage(file: File): Observable<string> {
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   return this.http.post
  // }

  ///KAMI ADDED METHODS TO UPLOAD THAT CONNECT WTIH SPRING

  //imageUploadAction() {    
   // const imageFormData = new FormData();
   // imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
  
  
   // this.httpClient.post('http://localhost:9001/image/upload', imageFormData, { observe: 'response' })
    //  .subscribe((response) => {
    //    if (response.status === 200) { 
    //      this.postResponse = response;                
    //      this.successResponse = this.postResponse.body.message;
     //   } else {
     ////     this.successResponse = 'Image not uploaded due to some error!';
     //   }
   //   }
   //   );
   // }
  
 // viewImage() {
 // this.httpClient.get('http://localhost:9001/get/info' + this.image)
 // .subscribe(
  //  res => {
  //    this.postResponse = res;          
  //    this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
  //  }
 // );
//  }
 // }

}
