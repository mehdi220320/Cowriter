export interface Chapter {
  _id:string,
  chapterNumber:string,
  book: { name:string },
  confirmedVersion:string,
  createdAt:string,
  updatedAt:string,
  createdBy:{_id:string,name:string}

}
