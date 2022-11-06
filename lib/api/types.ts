export interface CreateAuctionResponse {
  metal: string;
  metalOption: string;
  createdAt: string;
  updatedAt: string;
}

export interface Auctions {
  totalElements: number;
  totalPages: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  content: AuctionContent[];
  pageable: {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  empty: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface AuctionContent {
  id: string;
  auctionType: 'NORMAL' | 'REVERSE';
  endTime: string;
  auctionStatusType: string;
  description: string;
  auctionImageUrl: string;
  isDisplayed: string;
  auctionItem: AuctionItem;
  hostUser: HostUser;
  bids: number;
  winningBid: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuctionItem {
  metalId: number;
  metalName: string;
  metalOptionId: number;
  metalOptionName: string;
  amount: number;
  price: number;
}

export interface HostUser {
  createdAt: number;
  updatedAt: number;
  id: number;
  business: Business;
  personal: personal;
  account: Account;
  isEnabled: 'Y' | 'N';
  isDeleted: 'Y' | 'N';
}

export interface Business {
  businessType: string;
  businessName: string;
  representative: string;
  registrationNumber: string;
  licenceImageUrl: string;
}

export interface personal {
  name: string;
  email: string;
  password: string;
}
export interface Account {
  bank: string;
  accountNumber: string;
  accountHolder: string;
}

export interface AuctionParam {
  auctionItem: {
    amount: number;
    metalOptionId: number;
    price: number;
  };
  auctionType: 'NORMAL' | 'REVERSE';
  endTime: string;
  description?: string;
  auctionImageUrl?: string;
}

export interface PriceIndexCategoryAllResponse {
  id: number;
  name: string;
  originUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface PriceIndexCategoryResponse {
  id: number;
  value: string;
  createdAt: string;
  updatedAt: string;
}
