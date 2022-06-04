import { cardType } from "./card.model"

export interface CardForm {
  _id:string,
  /*firstName:string,
  lastName:string,
  number:string,
  CVV:string,
  type:cardType*/
  type:cardType,
  name:string,
  surname:string,
  number:string
  csc:string
}
