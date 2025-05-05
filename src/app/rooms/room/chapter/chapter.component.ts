import { Component } from '@angular/core';
import {DomSanitizer, SafeUrl ,SafeHtml  } from '@angular/platform-browser';
import {RoomsService} from '../../../services/rooms.service';
import {ActivatedRoute} from '@angular/router';
import {Room} from '../../../models/Room';
import {ChapterService} from '../../../services/chapter.service';
import {Chapter} from '../../../models/Chapter';
import {ChapterVersion} from '../../../models/ChapterVersion';

@Component({
  selector: 'app-chapter',
  standalone: false,
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.css'
})
export class ChapterComponent {
  roomId="";
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
  chapter: Chapter = {
    _id: '',
    title:'',
    chapterNumber: '0',
    book: {title:''},
    confirmedVersion: {_id:'',content:''},
    createdAt: '',
    updatedAt: '',
    createdBy: {_id: '', name: ''}
  };
  chapterId="";
  versions:ChapterVersion[]=[];
  constructor(private roomService:RoomsService,
              private sanitizer: DomSanitizer,
              private  route:ActivatedRoute,
              private chapterService:ChapterService) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.roomId = params['id'];
      this.chapterId=params['chapterId']
      console.log(this.roomId);
    });
    this.roomService.getRoomById(this.roomId).subscribe({next:(response)=>{
        this.room=response;
        console.log("hello room : ",this.room);
      },error:(err)=>{
        console.error(err);
      }
    });
    this.chapterService.getChapterById(this.chapterId).subscribe({
      next:(response)=>{
        this.chapter=response;
        console.log("chapters : "+response)
      },error:(err)=>{console.error(err)}
    })
    this.chapterService.getChapterVersions(this.chapterId).subscribe({
      next:(response)=>{
        this.versions=response;
        console.log("versions:"+this.versions)
      },error:(err)=>{console.error(err)}
    })

  }
  sanitizeImageUrl(url: { path: string } | null): SafeUrl | string {
    return url ?
      this.sanitizer.bypassSecurityTrustResourceUrl(url.path) :
      "assets/img/img.png";
  }

  currentVersionIndex = 0;
  translateValue = 0;
  S = [
    {
      id: 1,
      author: 'Alex Johnson',
      authorInitials: 'AJ',
      date: new Date('2023-05-15'),
      title: 'First Draft',
      preview: 'This is the initial version of the chapter with the basic storyline',
      upvotes: 12,
      downvotes: 2,
      userVote: 0 // 0 = no vote, 1 = upvote, -1 = downvote
    },
    {
      id: 2,
      author: 'Sam Rivera',
      authorInitials: 'SR',
      date: new Date('2023-05-18'),
      title: 'Revised Edition',
      preview: 'Added more character development and refined the dialogue',
      upvotes: 24,
      downvotes: 3,
      userVote: 1
    },
    {
      id: 3,
      author: 'Morgan Park',
      authorInitials: 'MP',
      date: new Date('2023-05-22'),
      title: 'Final Draft',
      preview: 'Incorporated all feedback and polished the narrative flow',
      upvotes: 42,
      downvotes: 1,
      userVote: 0
    }
    ,
    {
      id: 3,
      author: 'Morgan Park',
      authorInitials: 'MP',
      date: new Date('2023-05-22'),
      title: 'Final Draft',
      preview: 'Incorporated all feedback and polished the narrative flow',
      upvotes: 42,
      downvotes: 1,
      userVote: 0
    }
  ];

  get currentVersion() {
    return this.currentVersionIndex + 1;
  }

  get totalVersions() {
    return this.versions.length;
  }

  get dots() {
    return Array(this.totalVersions).fill(0);
  }

  nextVersion() {
    if (this.currentVersionIndex < this.versions.length - 1) {
      this.currentVersionIndex++;
      this.translateValue = -100 * this.currentVersionIndex;
    }
  }

  prevVersion() {
    if (this.currentVersionIndex > 0) {
      this.currentVersionIndex--;
      this.translateValue = -100 * this.currentVersionIndex;
    }
  }

  goToVersion(index: number) {
    this.currentVersionIndex = index;
    this.translateValue = -100 * index;
  }

  upvoteVersion(versionId: any) {
    // const version = this.versions.find(v => v.id === versionId);
    // if (version) {
    //   if (version.userVote === 1) {
    //     // Remove upvote
    //     version.upvotes--;
    //     version.userVote = 0;
    //   } else {
    //     // Add or change to upvote
    //     if (version.userVote === -1) version.downvotes--;
    //     version.upvotes += version.userVote === 0 ? 1 : 2;
    //     version.userVote = 1;
    //   }
    // }
  }

  downvoteVersion(versionId: any) {
    // const version = this.versions.find(v => v.id === versionId);
    // if (version) {
    //   if (version.userVote === -1) {
    //     // Remove downvote
    //     version.downvotes--;
    //     version.userVote = 0;
    //   } else {
    //     // Add or change to downvote
    //     if (version.userVote === 1) version.upvotes--;
    //     version.downvotes += version.userVote === 0 ? 1 : 2;
    //     version.userVote = -1;
    //   }
    // }
  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
