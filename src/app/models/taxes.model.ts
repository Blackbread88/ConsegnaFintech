export interface Taxes {
  contribuente:Contribuente,
  erario:Erario[],
  inps:Inps[]
}
export interface Contribuente {
  codFiscale:string,
  cognome:string,
  nome:string,
  dataNascita:string,
  sesso:string,
  provNascita:string,
  comNascita:string
}
export interface Erario {
  codiceTributo: string,
  anno: string,
  debito: number,
  credito: number
}
export interface Inps {
  codiceSede: string,
  causaleContributo: string,
  codiceInps:string,
  da: string,
  a: string,
  debito: number,
  credito: number
}
