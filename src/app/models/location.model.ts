export interface Location {
  _id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  coords: [number, number]
}
