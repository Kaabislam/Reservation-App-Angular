import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../models/reservation.model';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-registration-list',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './registration-list.component.html',
  styleUrl: './registration-list.component.css'
})
export class RegistrationListComponent implements OnInit {
  reservations: Reservation[] = [];
  constructor(private reservationService:ReservationService,private router:Router){

  }
  ngOnInit(): void {
    this.loadReservations();
  }
  loadReservations(): void {
    this.reservationService.getAllReservation().subscribe(
      (data: Reservation[]) => {
        this.reservations = data; // Assign the received data to the local reservations variable
        console.log(this.reservations); // Log the reservations for debugging
      },
      (error) => {
        console.error('Error loading reservations:', error); // Handle errors if the request fails
      }
    );
  }
  

  deleteReservation(reservationId:number):void{
    this.reservationService.deleteReservation(reservationId).subscribe(
      (response) => {
        console.log('deleted !!');
        this.loadReservations();  

      },
      (error) => {

      }
    );
  }
  updateReservation(reservationId:number):void{
    this.router.navigate(['/add',reservationId]);
    console.log('update clicked');
  }
  

}
