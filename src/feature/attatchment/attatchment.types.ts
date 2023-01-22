export interface IAttatchmentReq {
  body: any;
  folderName: string;
}
export interface IAttatchmentResponse {
  message: string;
  files: IAttatchment[];
}

export interface IAttatchment {
  uri: string;
  fileName: string;
}
