export interface Volume {
  title: string;
  subtitle?: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  pageCount: number;
  dimensions?: Dimensions;
  printType: string;
  mainCategory?: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  contentVersion: string;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface Dimensions {
  height: string;
  width: string;
  thickness: string;
}

export interface ImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
}

export interface UserInfo {
  review?: any;
  readingPosition?: any;
  isPurchased: boolean;
  isPreordered: boolean;
  updated: string;
}

export interface SaleInfo {
  country: string;
  saleability: string;
  onSaleDate?: string;
  isEbook: boolean;
  listPrice: Price;
  retailPrice?: Price;
  buyLink?: string;
}

export interface Price {
  amount: number;
  currencyCode: string;
}

export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: EPUB;
  pdf: PDF;
  webReaderLink: string;
  accessViewStatus: string;
  downloadAccess?: DownloadAccess;
}

export interface EPUB {
  isAvailable: boolean;
  downloadLink?: string;
  acsTokenLink?: string;
}

export interface PDF {
  isAvailable: boolean;
  downloadLink?: string;
  acsTokenLink?: string;
}

export interface DownloadAccess {
  kind: string;
  volumeId: string;
  restricted: boolean;
  deviceAllowed: boolean;
  justAcquired: boolean;
  maxDownloadDevices: number;
  downloadsAcquired: number;
  nonce: string;
  source: string;
  reasonCode: string;
  message?: string;
  signature?: string;
}

export interface SearchInfo {
  textSnippet: string;
}
