import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reservation } from '../../models/reservation.model';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent implements OnInit {
  reservationForm:FormGroup;
  reservationId:number|null = null;
  reservation:Reservation|null = null;

  constructor(
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private reservationService:ReservationService
    ){
    this.reservationForm = this.fb.group({
      name:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      requests: ['']
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id){
        this.reservationId = +id;
        console.log('id is ' + id);
        this.loadReservation();
      }
    });
  }

  loadReservation():void{
    if(this.reservationId != null){
      this.reservationService.getReservationById(this.reservationId).subscribe(
        (response) => {
          this.reservation = response;
          if(this.reservation){
            this.reservationForm.patchValue(this.reservation);
          }
        },
        (error) => {
          console.log("error on fetcing te data")
        }
      );
    }
   
  }


  submitReservation(){
    console.log('sadsad');
    if(this.reservationForm.valid){
      if(this.reservationId != null){
        const formData = this.reservationForm.value;
        const updatedReservation : Reservation = {
          ...formData,
          id : this.reservationId
        };
        this.reservationService.updateReservation(updatedReservation).subscribe(
          (response) => {
            console.log('Reservation updated successfully:', response);
          },
          (error) => {
            console.error('Error updating reservation:', error);
          }
        );
      }
      else{
        const newreservation:Reservation = this.reservationForm.value;
        this.reservationService.addReservation(newreservation).subscribe(
          (response) => {
            console.log('reservation added :',response);
          },
          (error) => {
            console.error('Error adding reservation:', error);  
          }
        );
      }
      
    }else {
      console.log('Form is invalid.');
    }
  }

}
