import {Component, OnInit} from '@angular/core';
import {RoomsService} from '../../services/rooms.service';
import {Room} from '../../models/Room';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {BooksService} from '../../services/books.service';
import {Book} from '../../models/Book';

@Component({
  selector: 'app-room',
  standalone: false,
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent implements OnInit{
  constructor(private roomService:RoomsService,
              private sanitizer: DomSanitizer,
              private  route:ActivatedRoute,
              private bookService:BooksService) {}
  roomId="";
  books:Book[]=[]
  room: Room = {
    _id: "",
    name: "",
    code: "",
    createdBy: {
      _id: "",
      name: ""
    },
    users:[ {    _id: "", name: ""}],
    pendingMembers: [],
    description: "",
    coverImage: {
      path: "",
      contentType: ""
    },
    visibility: ""
  };
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.roomId = params['id'];
      console.log(this.roomId);
    });
    this.roomService.getRoomById(this.roomId).subscribe({next:(response)=>{
        this.room=response;
        console.log("hello room : ",this.room);
      },error:(err)=>{
        console.error(err);
        }
    });
    this.bookService.getBooksByroom(this.roomId).subscribe({next:(response)=>{
      this.books=response;
      console.log(this.books);
      },error:(err)=>{console.error(err)}}
    )
  }
  sanitizeImageUrl(url: { path: string } | null): SafeUrl | string {
    return url ?
      this.sanitizer.bypassSecurityTrustResourceUrl(url.path) :
      "assets/img/img.png";
  }
  isCopied = false;

  async copyInviteLink() {
    try {
      await navigator.clipboard.writeText(this.room.code);
      this.isCopied = true;
      setTimeout(() => this.isCopied = false, 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = this.room.code;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        this.isCopied = true;
        setTimeout(() => this.isCopied = false, 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textArea);
    }
  }


}
