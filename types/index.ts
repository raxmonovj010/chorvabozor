export type Category = "qoramol" | "qoy" | "echki" | "ot" | "tuya" | "parranda" | "boshqa";
export type ListingStatus = "active" | "sold" | "inactive";
export interface IListing {
  _id: string; title: string; description: string; price: number;
  priceNegotiable: boolean; category: Category;
  animal: { breed?: string; age?: { value: number; unit: string }; gender?: string; weight?: number; count?: number; isVaccinated?: boolean; withDocuments?: boolean };
  location: { region: string; district?: string };
  images: string[]; phone: string; showPhone: boolean;
  seller: { _id: string; name: string; phone?: string; avatar?: string };
  status: ListingStatus; views: number;
  createdAt: string;
}
export interface IUser { _id: string; name: string; phone?: string; email?: string; avatar?: string; region?: string; rating: number; isVerified: boolean; }
export interface IFavorite { _id: string; userId: string; listingId: IListing; createdAt: string; }
