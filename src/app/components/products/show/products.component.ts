import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserProduct } from '../../../shared/models/userProduct.model';
import { CommonService } from '../../../shared/services/common/common.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: UserProduct[] = [
    {
      image:
        'https://github.com/ameapps/SharedLogin/blob/master/src/assets/images/products/CustomCv/4x.png?raw=true',
      name: 'CustomCv',
      description: 'App web che mostra il mostra il CV personalizzato',
      link: 'https://ameapps.github.io/CustomCv/#',
      tags: ['app', 'angular'],
    },
    {
      image:
        'https://github.com/ameapps/SharedLogin/blob/master/src/assets/images/products/SportTracker/1x.png?raw=true',
      name: 'SportTracker',
      description:
        'App per il monitoraggio delle attività sportive e del cibo assunto',
      link: 'https://ameapps.github.io/SportTracker/#/menu/homepage',
      tags: ['app', 'angular'],
    },
    {
      image:
        'https://github.com/ameapps/SharedLogin/blob/master/src/assets/images/products/GameScopa/1x.png?raw=true',
      name: 'GameScopa',
      description: 'Celebre gioco di carte italiano',
      link: 'https://ameapps.github.io/GameScopa',
      tags: ['game', 'ionic', 'angular'],
    },
    {
      image:
        'https://github.com/ameapps/SharedLogin/blob/master/src/assets/images/products/MomsDay/2025/1x.png?raw=true',
      name: 'MomsDay',
      description: 'App per la celebrazione della giornata della mamma',
      link: 'https://ameapps.github.io/MomsDay2025/',
      tags: ['app', 'vanilla'],
    },
    {
      image:
        'https://github.com/ameapps/SharedLogin/blob/master/src/assets/images/products/WordleClone/2x.jpg?raw=true',
      name: 'WordleClone',
      description: 'App che simula il gioco Wordle',
      link: 'https://ameapps.github.io/WordleClone/',
      tags: ['game', 'vanilla'],
    },
    {
      image:
        'https://github.com/ameapps/SharedLogin/blob/master/src/assets/images/products/LovePurpose/1x.png?raw=true',
      name: 'LovePurpose',
      description: 'App per dichiarare il proprio amere ad una ragazza',
      link: 'https://ameapps.github.io/LovePurpose/',
      tags: ['app', 'vanilla'],
    },
    {
      image:
        'https://github.com/ameapps/SharedLogin/blob/master/src/assets/images/products/WorkTools/1x.png?raw=true',
      name: 'WorkTools',
      description: 'App che propone una serie di tools da usare sul lavoro',
      link: 'https://ameapps.github.io/WorkToolsV2.0/',
      tags: ['app', 'angular'],
    },
  ];

  // Filtro tag
  allTags: string[] = [];
  selectedTags: string[] = [];
  filteredProducts: UserProduct[] = [];

  constructor(
    public common: CommonService,
    private router: Router,
    private fb_service: FirebaseService
  ) {
    this.updateTags();
    this.filterProducts();
  }
  async ngOnInit(): Promise<void> {
    //03. Recupero la lista di prodotti a cui l'utente ha accesso
    const products = await this.fb_service.getUserProducts(
      this.common.lastLoggedUser.uId
    );
    console.log('Prodotti utente:', products);
  }

  updateTags() {
    const tagsSet = new Set<string>();
    this.products.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    this.allTags = Array.from(tagsSet);
  }

  toggleTag(tag: string) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter((t) => t !== tag);
    } else {
      this.selectedTags.push(tag);
    }
    this.filterProducts();
  }

  filterProducts() {
    if (this.selectedTags.length === 0) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter((p) =>
        p.tags?.some((t) => this.selectedTags.includes(t))
      );
    }
  }

  openProductLink(link: string) {
    window.open(link, '_blank');
  }

  addProduct() {
    this.router.navigate(['/products/add']);
  }
}
