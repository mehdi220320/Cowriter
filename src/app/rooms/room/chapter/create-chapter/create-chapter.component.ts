import { Component } from '@angular/core';
import {Room} from '../../../../models/Room';
import {RoomsService} from '../../../../services/rooms.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ChapterService} from '../../../../services/chapter.service';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {Book} from '../../../../models/Book';
import {BooksService} from '../../../../services/books.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-chapter',
  standalone: false,
  templateUrl: './create-chapter.component.html',
  styleUrl: './create-chapter.component.css'
})
export class CreateChapterComponent {
  title="";
  roomId="";
  chapterId="";
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
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '30rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'yes',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    fonts: [
      { name: 'Arial', class: 'arial' },
      { name: 'Times New Roman', class: 'times-new-roman' },
      { name: 'Georgia', class: 'georgia' },
      { name: 'Verdana', class: 'verdana' },
      { name: 'Courier New', class: 'courier-new' },
      { name: 'Trebuchet MS', class: 'trebuchet-ms' },
      { name: 'Tahoma', class: 'tahoma' },
      { name: 'Comic Sans MS', class: 'comic-sans-ms' },
      { name: 'Impact', class: 'impact' },
      { name: 'Garamond', class: 'garamond' },
      { name: 'Palatino Linotype', class: 'palatino-linotype' },
      { name: 'Helvetica', class: 'helvetica' },
      { name: 'Franklin Gothic Medium', class: 'franklin-gothic-medium' },
      { name: 'Baskerville', class: 'baskerville' },
      { name: 'Roboto', class: 'roboto' },
      { name: 'Open Sans', class: 'open-sans' },
      { name: 'Lato', class: 'lato' },
      { name: 'Montserrat', class: 'montserrat' },
      { name: 'Poppins', class: 'poppins' },
      { name: 'Raleway', class: 'raleway' },
      { name: 'Source Sans Pro', class: 'source-sans-pro' },
      { name: 'Nunito', class: 'nunito' },
      { name: 'Merriweather', class: 'merriweather' },
      { name: 'Quicksand', class: 'quicksand' },
      { name: 'Ubuntu', class: 'ubuntu' },
      { name: 'Playfair Display', class: 'playfair-display' },
      { name: 'Oswald', class: 'oswald' },
      { name: 'PT Sans', class: 'pt-sans' }
    ]


  };
  HtmlContent='';
  constructor(private roomService:RoomsService,
              private sanitizer: DomSanitizer,
              private  route:ActivatedRoute,
              private router:Router,
              private chapterService:ChapterService,
              private bookService:BooksService,
              private location: Location) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.roomId = params['id'];
      this.bookId=params['bookId']
    });
    this.roomService.getRoomById(this.roomId).subscribe({next:(response)=>{
        this.room=response;
        console.log("hello room : ",this.room);
      },error:(err)=>{
        console.error(err);
      }
    });
    this.bookService.getBookById(this.bookId).subscribe({next:(response)=>{
      this.book=response;
      },
      error:(err)=>{console.error(err)}
    })
  }
  sanitizeImageUrl(url: { path: string } | null): SafeUrl | string {
    return url ?
      this.sanitizer.bypassSecurityTrustResourceUrl(url.path) :
      "assets/img/img.png";
  }
  onRegister() {
    this.chapterService.addChapter({bookId:this.bookId,title:this.title,createdBy:localStorage.getItem('user_id')}).subscribe({
      next:(response)=>{
        this.chapterId=response._id
        const data={chapterId:this.chapterId,content:this.HtmlContent,createdBy:localStorage.getItem('user_id')};
        this.chapterService.AddChapterVersion(data).subscribe({
          next:(response)=>{
            this.router.navigate(['/room/'+this.roomId+'/chapter/'+this.chapterId]);
            console.log(response);
          },error:(err)=>{console.log(err)}
        })
      }
    })


  }

  cancel(){
    this.location.back();
  }

}
