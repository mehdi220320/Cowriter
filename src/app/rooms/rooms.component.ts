import {Component, OnInit} from '@angular/core';
import {RoomsService} from '../services/rooms.service';
import {Room} from '../models/Room';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-rooms',
  standalone: false,
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit{
  rooms: Room[] = [];
  myrooms: Room[] = [];
  visibleRooms: Room[] = [];
  currentIndex: number = 0;
  itemsToShow: number = 4;
  userId: string | null = null;

  constructor(
    private roomService: RoomsService,
    private sanitizer: DomSanitizer
  ) {}

  sanitizeImageUrl(url: { path: string } | null): SafeUrl | string {
    return url ?
      this.sanitizer.bypassSecurityTrustResourceUrl(url.path) :
      "assets/img/img.png";
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id');

    this.loadAllRooms();
    this.loadMyRooms();
  }

  loadAllRooms(): void {
    this.roomService.getAllRooms().subscribe({
      next: (response) => {
        this.rooms = response;
      },
      error: (err) => {
        console.error('Error fetching all rooms:', err);
      }
    });
  }

  loadMyRooms(): void {
    if (!this.userId) return;

    this.roomService.getMyRooms(this.userId).subscribe({
      next: (response) => {
        this.myrooms = response;
        this.updateVisibleRooms(); // Initialize visible rooms
      },
      error: (err) => {
        console.error('Error fetching my rooms:', err);
      }
    });
  }

  updateVisibleRooms(): void {
    this.visibleRooms = this.myrooms.slice(
      this.currentIndex,
      this.currentIndex + this.itemsToShow
    );
  }

  moveRight(): void {
    if (this.canMoveRight()) {
      this.currentIndex++;
      this.updateVisibleRooms();
    }
  }

  moveLeft(): void {
    if (this.canMoveLeft()) {
      this.currentIndex--;
      this.updateVisibleRooms();
    }
  }

  canMoveRight(): boolean {
    return this.currentIndex + this.itemsToShow < this.myrooms.length;
  }

  canMoveLeft(): boolean {
    return this.currentIndex > 0;
  }
}
