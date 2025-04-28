import {Component, OnInit} from '@angular/core';
import {RoomsService} from '../services/rooms.service';
import {Room} from '../models/Room';

@Component({
  selector: 'app-rooms',
  standalone: false,
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit{
  rooms:Room[]=[];
  constructor(private roomService:RoomsService) {
  }

  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe({
      next: (response) => {
        console.log('Rooms data:', response);
        this.rooms=response;
      },
      error: (err) => {
        console.error('Error fetching rooms:', err);
      }
    });
  }

}
