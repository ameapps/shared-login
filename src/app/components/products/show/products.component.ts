import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  products: UserProduct[] = [];

  // Filtro tag
  allTags: string[] = [];
  selectedTags: string[] = [];
  filteredProducts: UserProduct[] = [];

  constructor(
    public common: CommonService,
    private router: Router,
    private fb_service: FirebaseService,
    private cdRef: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    //01. Recupero quali sono i prodotti a cui l'utente ha accesso
    const allowedNames = await this.fb_service.getUserAllowedProducts(
      this.common.lastLoggedUser?.uId ?? ''
    );
    //02. Recupero i suoi prodotti
    const products = await this.fb_service.getUserProducts(
      this.common.lastLoggedUser?.uId ?? '',
      allowedNames ?? []
    );
    this.products = Object.values(products || {}) as UserProduct[];
    //04. Aggiorno i tag e filtro i prodotti
    this.updateTags();
    this.filterProducts();
    this.cdRef.detectChanges();
    console.log('Prodotti utente:', this.products);
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

  editProfile() {
    // Logica per modifica profilo (es. apri dialog)
    alert('Funzione modifica profilo non ancora implementata.');
  }

  addProfile() {
    if (confirm('Sei sicuro di voler aggiungere un profilo?')) {
      alert('Funzione ADD profilo non ancora implementata.');
    }
  }

  deleteProfile() {
    // Logica per eliminazione profilo (es. conferma)
    if (confirm('Sei sicuro di voler eliminare il profilo?')) {
      alert('Funzione elimina profilo non ancora implementata.');
    }
  }
}
