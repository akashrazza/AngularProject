import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http:HttpClient) { }
  url = "http://localhost:8000/user/track"
  GetTrackDetails(OrderId:any):Observable<any>{
    return this.http.get(this.url+'/'+OrderId,{responseType:'json'})
  }

  CreateTrack(obj:any):Observable<any>{
    return this.http.post(this.url,obj,{headers:{'content-type':'application/json'},responseType:'text'})
  }

  DeletTrack(id:any):Observable<any>{
    return this.http.delete(this.url+'/'+id,{responseType:'text'})
  }

  UpdateTrack(id:any,obj:any):Observable<any>{
    return this.http.put(this.url+'/'+id,obj,{headers:{'content-type':'application/json'}})
  }
}
