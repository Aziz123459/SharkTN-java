import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../user';
import { Startup } from '../startup';
import { Investor } from '../investor';
import { Favorite } from '../favorite';
import { Incubator } from '../incubator';
import { PreSeed } from '../pre-seed';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl='http://localhost:8080/api/v1'
  constructor(private http:HttpClient) {}
  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.baseUrl}/favorites`);
  }

  addFavorite(favorite: Favorite): Observable<any> {
    return this.http.post(`${this.baseUrl}/favorites`, favorite);
  }

  removeFavorite(id: String | undefined |null): Observable<any> {
    return this.http.delete(`${this.baseUrl}/favorites/${id}`);
  }
  getstartups(): Observable<any>{
    return this.http.get(`${this.baseUrl}/all/startups`)
  }

  getstartup(id:String | undefined |null): Observable<any>{
    return this.http.get(`${this.baseUrl}/startup/${id}`).pipe(  
      catchError(this.handleError)
  )
  }

  getinvestor(id:String | undefined | null): Observable<any>{
    return this.http.get(`${this.baseUrl}/investor/${id}`).pipe(  
      catchError(this.handleError)
  )
  }

  getinvestors(): Observable<any>{
    return this.http.get(`${this.baseUrl}/all/investors`)
  }

  getusers(): Observable<any>{
    return this.http.get(`${this.baseUrl}/admin/user/all`)
  }

  getuser(id: string | undefined): Observable<any>{
    return this.http.get(`${this.baseUrl}/profile/${id}`)
  }

  getuser2(id: string | undefined): Observable<any>{
    return this.http.get(`${this.baseUrl}/user/${id}`)
  }

  getstartupByUserId(id:String | undefined |null): Observable<any>{
    return this.http.get(`${this.baseUrl}/startup/user/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  getInvestorById(id:String | undefined |null): Observable<any>{
    return this.http.get(`${this.baseUrl}/investor/user/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  createUser(data:User): Observable<any>{
    return this.http.post(`${this.baseUrl}/auth/register`,data).pipe(  
      catchError(this.handleError)
  )
  }
  login(data:User): Observable<any>{
    console.log("from login service : ");
    console.log( data);
    
    return this.http.post(`${this.baseUrl}/auth/authenticate`,data).pipe(  
      catchError(this.handleloginerror)
  )
  }

  creatStartup(data:Startup): Observable<any>{
    return this.http.post(`${this.baseUrl}/startup/new`,data).pipe(  
      catchError(this.handleError)
  )
  }

  creatInvestor(data:Investor): Observable<any>{
    return this.http.post(`${this.baseUrl}/investor/new`,data).pipe(  
      catchError(this.handleError)
  )
  }
  // *******************************
  creatIncubator(data:Incubator): Observable<any>{
    return this.http.post(`${this.baseUrl}/new/incubator`,data).pipe(  
      catchError(this.handleError)
  )
  }
  getIncubator(id:String | undefined |null): Observable<any>{
    return this.http.get(`${this.baseUrl}/incubator/${id}`).pipe(
      catchError(this.handleError)
    )
  }
  getIncubators(): Observable<any>{
    return this.http.get(`${this.baseUrl}/all/incubators`).pipe(
      catchError(this.handleError)
    )
  }
  // *******************************
   // Create a new pre-seed investment
  createPreSeed(data: PreSeed): Observable<any> {
    return this.http.post(`${this.baseUrl}/new/preseed`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Get a specific pre-seed investment by ID
  getPreSeed(id: string | undefined | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/preseed/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get all pre-seed investments
  getPreSeeds(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all/preseeds`).pipe(
      catchError(this.handleError)
    );
  }
  // ***********************************************
  private handleError(err: any): Observable<any> {
    console.error('an error occurred!', err)
    return throwError(()=>err.error.errors)
  }

  private handleloginerror(err: any): Observable<any> {
    console.error('an error occurred!', err)
    return throwError(()=>err.error)
  }

  uploadImage(sticker: File): Observable<any> {
    console.log(sticker);
    const data = new FormData();
    data.append('sticker', sticker, sticker.name);
    return this.http.post<any>(this.baseUrl+"/upload", data);
  }

  logoutUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout`).pipe(
      catchError((err) => {
        console.error('Error during logout:', err);
        return throwError(() => err);
      })
    );
  }
  delete(id:string | undefined |null ): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${id}`);
  }
  
  // In apiService.ts

// Fetch all investors
getAllInvestors(): Observable<any> {
  return this.http.get(`${this.baseUrl}/investors/all`);
}

// Fetch all startups
getAllStartups(): Observable<any> {
  return this.http.get(`${this.baseUrl}/startups/all`);
}

updateUser(data : User): Observable<any> {
  return this.http.patch(`${this.baseUrl}/profile/${data.id}`,data).pipe(  
    catchError(this.handleError)
  )
}
updateInvestor(data : Investor): Observable<any> {
  return this.http.patch(`${this.baseUrl}/investor/${data.id}`,data).pipe(  
    catchError(this.handleError)
  )
}
updateStartup(data : Startup): Observable<any> {
  console.log("data from service : "+ data.briefDescription)
  return this.http.put(`${this.baseUrl}/startup/${data.id}`,data).pipe(  
    catchError(this.handleError)
  )
}
getStartupByUserId(userId: string |null|undefined): Observable<Startup> {
  return this.http.get<Startup>(`${this.baseUrl}/startups/${userId}`);
}

// Fetch the related investor based on user ID
getInvestorByUserId(userId: string |null|undefined): Observable<Investor> {
  return this.http.get<Investor>(`${this.baseUrl}/investors/${userId}`);
}

// Delete user by ID
deleteUser(id: string): Observable<any> {
  return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'json' });
}

// deleteStartupById(id: string | null | undefined):Observable<any> {
//   return this.http.delete<Startup>(`${this.baseUrl}/startup/${id}`)
// }

// deleteInvestorById(id: string | null | undefined):Observable<any> {
//   return this.http.delete<Investor>(`${this.baseUrl}/investor/${id}`)
// }





}

