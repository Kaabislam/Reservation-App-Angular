import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../models/reservation.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration-list.component.html',
  styleUrl: './registration-list.component.css'
})
export class RegistrationListComponent implements OnInit {
  reservations: Reservation[] = [];
  constructor(private reservationService:ReservationService,private router:Router){

  }
  ngOnInit(): void {
    this.loadReservations();
    console.log("this is called ");
  }
  loadReservations():void{
    console.log("data from reservation service : "+this.reservationService.getAllReservation());
    this.reservations = this.reservationService.getAllReservation();
  }


  deleteReservation(reservationId:number):void{
    this.reservationService.deleteReservation(reservationId);
    this.loadReservations();  
  }
  updateReservation(reservationId:number):void{
    this.router.navigate(['/add',reservationId]);
    console.log('update clicked');
  }
  

}
