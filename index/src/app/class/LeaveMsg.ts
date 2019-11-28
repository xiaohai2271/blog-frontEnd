export class LeaveMsg {
  id: number;
  type: number;
  authorName: string;
  authorAvatarImgUrl: string;
  content: string;
  date: string;
  pid: number;
  responseId: string;
  child: LeaveMsg[];
}
