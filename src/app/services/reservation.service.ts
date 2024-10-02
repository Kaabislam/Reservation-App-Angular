import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservations';
  private reservations:Reservation[] = [];
  constructor(private http:HttpClient) {
    // this.loadReservationFromStorage();
   }
   private loadReservationFromStorage():void{
    const storedReservations = localStorage.getItem('reservations');
    if(storedReservations){
      this.reservations = JSON.parse(storedReservations);
    }
  }
  private saveReservationsToLocalStorage():void{
    localStorage.setItem('reservations',JSON.stringify(this.reservations));
    
  }
  addReservation(reservation:Reservation):Observable<Reservation>{
    return this.http.post<Reservation>(this.apiUrl,reservation);
  }
  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>( `${this.apiUrl}/${id}`);
  }
  getAllReservation():Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.apiUrl);   
  }

  deleteReservation(reservationId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${reservationId}`);
  }
  updateReservation(reservation:Reservation):Observable<Reservation>{
    return this.http.put<Reservation>(`${this.apiUrl}/${reservation.id}`,reservation);
  }
}
