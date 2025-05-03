export interface ChapterVersion {
  _id:string,
  chapter:string,
  createdBy:{name:string,_id:string},
  votes:number,
  content:string,
  createdAt:string,
  updatedAt:string,
}
