import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../models/Book';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-bookdetails',
  standalone: false,
  templateUrl: './bookdetails.component.html',
  styleUrl: './bookdetails.component.css'
})
export class BookdetailsComponent implements OnInit{
  bookId="";
  book:Book={
    _id:"",
    title:"",
    description:"",
    createdBy:{_id:"",name:""},
    chapters:[],
    completed:false,
    coverImage:{path:"",contentType:""},
    createdAt:"",
    lastChapterDeclared:"",
    room:"",
    __v:"",
    type:"",
    updatedAt:""
  }
  constructor(private route:ActivatedRoute,private bookService:BooksService) {
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      console.log(this.bookId);
    });
    this.bookService.getBookById(this.bookId).subscribe({
      next:(response)=>{
        this.book=response;
      },error:(err)=>{console.error(err)}
    })

  }
}
