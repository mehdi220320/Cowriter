export interface Book {
  _id:string,
  title:string,
  type:string,
  room:string,
  createdBy:{_id:string,name:string}
  chapters:string[],
  lastChapterDeclared:string,
  createdAt:string,
  updatedAt:string,
  __v:string,
  completed:boolean,

}
