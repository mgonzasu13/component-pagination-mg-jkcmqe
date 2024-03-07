import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.css'],
})
export class CustomPaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 100;
  @Input() itemsPerPage: number = 5;
  @Input() numPageGroups: number = 5;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  onPageChange(pageNumber: number): void {
    this.pageChange.emit(pageNumber);
  }

  onNextClick(): void {
    if (this.currentPage < this.getMaxPage()) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  onPreviousClick(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  onNextGroupClick(): void {
    const nextPage = Math.min(this.currentPage + 5, this.getMaxPage());
    this.currentPage = nextPage;
    this.pageChange.emit(nextPage);
  }

  onPreviousGroupClick(): void {
    const previousPage = Math.max(this.currentPage - 5, 1);
    this.currentPage = previousPage;
    this.pageChange.emit(previousPage);
  }

  getPage2s(): number[] {
    const totalPages = this.getMaxPage();
    const pagesToShow = 5;
    const currentPageGroup = Math.ceil(this.currentPage / pagesToShow); // Calcula el grupo de la página actual
    const startPage = (currentPageGroup - 1) * pagesToShow + 1; // Calcula la primera página del grupo actual
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages); // Calcula la última página del grupo actual

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }
  getPages(): number[] {
    const totalPages = this.getMaxPage();
    const pagesToShow = this.numPageGroups;
    const currentPageGroup = Math.ceil(this.currentPage / pagesToShow); // Calcula el grupo de la página actual
    const startPage = (currentPageGroup - 1) * pagesToShow + 1; // Calcula la primera página del grupo actual
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages); // Calcula la última página del grupo actual

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  getMaxPage(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
