import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations:Reservation[] = [];
  constructor() {
    this.loadReservationFromStorage();
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
  addReservation(reservation:Reservation):void{
    reservation.id = Date.now();
    this.reservations.push(reservation);
    this.saveReservationsToLocalStorage();
  }
  getReservationById(id: number): Reservation | null {
    const reservation = this.reservations.find(res => res.id === id);
    return reservation || null; 
  }
  getAllReservation():Reservation[]{
    console.log(this.reservations);
    return this.reservations;
  }

  deleteReservation(reservationId:number):void{
    this.reservations = this.reservations.filter(reservation => reservation.id != reservationId);
    this.saveReservationsToLocalStorage();
    console.log("delete happened");
  }
  updateReservation(reservation:Reservation):void{
    const index = this.reservations.findIndex(res => res.id == reservation.id);
    if(index != -1){
      this.reservations[index] = reservation;
      this.saveReservationsToLocalStorage();
    }
    console.log(index);
  }
}
