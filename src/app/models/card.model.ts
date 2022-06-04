export interface Card {
  _id:string,
  number:string,
  ownerId:string,
  owner:string
  type:cardType,
  amount:number
}
export type cardType='visa'|'mastercard';
