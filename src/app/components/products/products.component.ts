import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserProduct } from '../../shared/models/userProduct.model';
import { CommonService } from '../../shared/services/common/common.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: UserProduct[] = [
    {
      image: 'https://www.giardiniblog.it/wp-content/uploads/2022/05/immagine-tramonto-gratis.jpg',
      name: 'Prodotto 1',
      description: 'Descrizione del prodotto 1',
      link: 'https://www.google.com/search?q=tramonto+gratis',
    },
    {
      image: 'https://cdn.pixabay.com/photo/2022/07/05/11/06/mountains-7302806__480.jpg',
      name: 'Prodotto 2',
      description: 'Descrizione del prodotto 2',
      link: 'https://www.google.com/search?q=montagne+gratis'
    },
    {
      image: 'https://tse2.mm.bing.net/th/id/OIP.4nY4Ys05hzDoNVpPJemNHwHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      name: 'Prodotto 3',
      description: 'Descrizione del prodotto 3',
      link: 'https://www.google.com/search?q=prodotto+3+gratis'
    },
    {
      image: 'https://tse2.mm.bing.net/th/id/OIP.4nY4Ys05hzDoNVpPJemNHwHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      name: 'Prodotto 4',
      description: 'Descrizione del prodotto 4',
      link: 'https://www.google.com/search?q=prodotto+4+gratis'
    },
    {
      image: 'https://tse2.mm.bing.net/th/id/OIP.4nY4Ys05hzDoNVpPJemNHwHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      name: 'Prodotto 5',
      description: 'Descrizione del prodotto 5',
      link: 'https://www.google.com/search?q=prodotto+5+gratis'
    },
    {
      image: 'https://tse2.mm.bing.net/th/id/OIP.4nY4Ys05hzDoNVpPJemNHwHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      name: 'Prodotto 6',
      description: 'Descrizione del prodotto 6',
      link: 'https://www.google.com/search?q=prodotto+6+gratis'
    },
    {
      image: 'https://tse2.mm.bing.net/th/id/OIP.4nY4Ys05hzDoNVpPJemNHwHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      name: 'Prodotto 7',
      description: 'Descrizione del prodotto 7',
      link: 'https://www.google.com/search?q=prodotto+7+gratis'
    },
    {
      image: 'https://tse2.mm.bing.net/th/id/OIP.4nY4Ys05hzDoNVpPJemNHwHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      name: 'Prodotto 8',
      description: 'Descrizione del prodotto 8',
      link: 'https://www.google.com/search?q=prodotto+8+gratis'
    },
    {
      image: 'https://tse2.mm.bing.net/th/id/OIP.4nY4Ys05hzDoNVpPJemNHwHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      name: 'Prodotto 9',
      description: 'Descrizione del prodotto 9',
      link: 'https://www.google.com/search?q=prodotto+9+gratis'
    }
  ];

  constructor(public common:CommonService) {}

  openProductLink(link: string) {
    window.open(link, '_blank');
  }
}
// This component represents a products area accessible only after login.
