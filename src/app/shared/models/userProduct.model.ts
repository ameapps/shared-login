export class UserProduct {
  /**Id del prodotto */
  id!: string;
  /**Link al prodotto */
  link!: string;
  /**Nome del prodotto */
  name: string = '';
  /**Descrizione del prodotto */
  description: string = '';
  /**Link all'immagine del prodotto (opzionale) */
  image?: string;
  /**Tags per filtrare i prodotti */
  tags: string[] = [];
}
