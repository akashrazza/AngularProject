import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http:HttpClient) { }
  url = "https://shopbackend-v4n9.onrender.com/user/track";

  //Get Tracking
  GetTrackDetails(OrderId:any):Observable<any>{
    return this.http.get(this.url+'/'+OrderId,{responseType:'json'})
  }

  //Create Track for Admin
  CreateTrack(obj:any):Observable<any>{
    return this.http.post(this.url,obj,{headers:{'content-type':'application/json'},responseType:'text'})
  }

  //Delete A Track for Admin
  DeletTrack(id:any):Observable<any>{
    return this.http.delete(this.url+'/'+id,{responseType:'text'})
  }

  //Update A Track for Admin
  UpdateTrack(id:any,obj:any):Observable<any>{
    return this.http.put(this.url+'/'+id,obj,{headers:{'content-type':'application/json'}})
  }
}
