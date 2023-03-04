export interface IPost {
  _id: string;
  author: string;
  title: string;
  description: string;
  date: string;
  createdDate: Date;
  editedDate?: Date;
}
