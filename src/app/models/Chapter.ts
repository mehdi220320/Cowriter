export interface Chapter {
  _id:string,
  title:string,
  chapterNumber:string,
  book: { title:string },
  confirmedVersion:{_id:string,content:string},
  createdAt:string,
  updatedAt:string,
  createdBy:{_id:string,name:string}

}
