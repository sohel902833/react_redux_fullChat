export interface IAttatchmentReq {
  body: any;
  folderName: string;
}
export interface IAttatchmentResponse {
  message: string;
  files: IAttatchment[];
}

export interface IAttatchment {
  _id?: string;
  uri: string;
  fileName: string;
  url?: string;
}
