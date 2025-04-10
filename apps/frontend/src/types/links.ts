export interface CreateLinkRequest {
    longUrl: string;
    customAlias?: string;
    expirationDate?: string;
  }
  
  export interface Link extends CreateLinkRequest {
    id: string;
    shortCode: string;
    userId: string;
    clicks: number;
    createdAt: string;
  }