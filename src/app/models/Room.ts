export interface Room{
  _id:string;
  name: string;
  code: string;
  createdBy: string,
  users: string,
  pendingMembers: string[],
  description:string,
  coverImage: {
    path: string,
    contentType: string,
  },
  visibility: string,
}
