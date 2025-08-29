import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserProduct } from '../../../shared/models/userProduct.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../shared/services/common/common.service';

@Component({
  selector: 'app-crud-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-product.component.html',
  styleUrl: './crud-product.component.scss'
})
export class CrudProductComponent implements OnInit {

  // #region variables
  success = false;
  selectedTags: string[] = ['gioco', 'app'];
  customTag: string = '';
  pageTitle = 'Aggiungi nuovo prodotto';
  // #endregion

  constructor(private route: ActivatedRoute, private router: Router, public common: CommonService) { }

  ngOnInit() {
    // Se la rotta contiene 'edit', cambia il titolo
    if (this.router.url.includes('/products/edit')) {
      this.pageTitle = 'Modifica prodotto';
    }
    console.log('prodotto selezionato', this.common.selectedProduct)
  }

  toggleDefaultTag(tag: string, event: any) {
    if (event.target.checked) {
      if (!this.selectedTags.includes(tag)) {
        this.selectedTags.push(tag);
      }
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
  }

  addCustomTag() {
    const tag = this.customTag.trim();
    if (tag && !this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
      this.customTag = '';
    }
  }

  removeTag(tag: string) {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
  }

  onSubmit() {
    // Associa i tag al prodotto
    if (this.common.selectedProduct) this.common.selectedProduct.tags = [...this.selectedTags];
    this.success = true;
    setTimeout(() => (this.success = false), 2000);
    this.selectedTags = [];
    console.log('this.common.selectedProduct.tags', this.common.selectedProduct?.tags)
  }
}
