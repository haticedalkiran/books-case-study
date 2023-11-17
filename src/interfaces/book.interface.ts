import { AccessInfo, SaleInfo, SearchInfo, UserInfo, Volume } from './volume.interface';

export interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: Volume;
  userInfo?: UserInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo;
}
