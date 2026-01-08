/**
 * Classe FilterManager - Gestionnaire de filtres réutilisable
 * Utile pour la UI et la logique métier
 */

export interface FilterConfig {
  key: string;
  value: unknown;
  operator?: 'equals' | 'contains' | 'startsWith' | 'gt' | 'lt' | 'gte' | 'lte' | 'in';
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export class FilterManager<T = Record<string, unknown>> {
  private filters: FilterConfig[] = [];
  private sorts: SortConfig[] = [];
  private limit?: number;
  private offset: number = 0;

  constructor() {
    this.filters = [];
    this.sorts = [];
  }

  /**
   * Ajoute un filtre
   */
  addFilter(key: string, value: unknown, operator: FilterConfig['operator'] = 'equals'): this {
    this.filters.push({ key, value, operator });
    return this;
  }

  /**
   * Ajoute plusieurs filtres
   */
  addFilters(configs: Omit<FilterConfig, 'operator'>[]): this {
    configs.forEach((config) => {
      this.addFilter(config.key, config.value);
    });
    return this;
  }

  /**
   * Retire un filtre par clé
   */
  removeFilter(key: string): this {
    this.filters = this.filters.filter((f) => f.key !== key);
    return this;
  }

  /**
   * Vide tous les filtres
   */
  clearFilters(): this {
    this.filters = [];
    return this;
  }

  /**
   * Ajoute un tri
   */
  addSort(key: string, direction: 'asc' | 'desc' = 'asc'): this {
    this.sorts.push({ key, direction });
    return this;
  }

  /**
   * Retire un tri par clé
   */
  removeSort(key: string): this {
    this.sorts = this.sorts.filter((s) => s.key !== key);
    return this;
  }

  /**
   * Vide tous les tris
   */
  clearSorts(): this {
    this.sorts = [];
    return this;
  }

  /**
   * Définit la limite de résultats
   */
  setLimit(limit: number): this {
    this.limit = limit;
    return this;
  }

  /**
   * Définit le décalage (pagination)
   */
  setOffset(offset: number): this {
    this.offset = offset;
    return this;
  }

  /**
   * Définit la page (1-indexed)
   */
  setPage(page: number, pageSize: number = 10): this {
    this.offset = (page - 1) * pageSize;
    this.limit = pageSize;
    return this;
  }

  /**
   * Applique les filtres à un tableau
   */
  applyFilters(items: T[]): T[] {
    return items.filter((item) => this.matchesAllFilters(item));
  }

  /**
   * Applique les tris à un tableau
   */
  applySorts(items: T[]): T[] {
    const sorted = [...items];
    this.sorts.forEach((sort) => {
      sorted.sort((a, b) => {
        const aVal = a[sort.key];
        const bVal = b[sort.key];

        if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    });
    return sorted;
  }

  /**
   * Applique la pagination
   */
  applyPagination(items: T[]): T[] {
    if (!this.limit) return items.slice(this.offset);
    return items.slice(this.offset, this.offset + this.limit);
  }

  /**
   * Applique tous les filtres, tris et pagination
   */
  apply(items: T[]): T[] {
    let result = this.applyFilters(items);
    result = this.applySorts(result);
    result = this.applyPagination(result);
    return result;
  }

  /**
   * Obtient les statistiques (avant pagination)
   */
  getStats(items: T[]): { total: number; filtered: number; page?: number; pageSize?: number } {
    const filtered = this.applyFilters(items);
    return {
      total: items.length,
      filtered: filtered.length,
      page: this.limit ? Math.floor(this.offset / this.limit) + 1 : undefined,
      pageSize: this.limit,
    };
  }

  /**
   * Vérifie si un élément correspond à tous les filtres
   */
  private matchesAllFilters(item: T): boolean {
    return this.filters.every((filter) => this.matchesFilter(item, filter));
  }

  /**
   * Vérifie si un élément correspond à un filtre
   */
  private matchesFilter(item: T, filter: FilterConfig): boolean {
    const value = item[filter.key];
    const operator = filter.operator || 'equals';

    switch (operator) {
      case 'equals':
        return value === filter.value;
      case 'contains':
        return String(value).includes(String(filter.value));
      case 'startsWith':
        return String(value).startsWith(String(filter.value));
      case 'gt':
        return value > filter.value;
      case 'lt':
        return value < filter.value;
      case 'gte':
        return value >= filter.value;
      case 'lte':
        return value <= filter.value;
      case 'in':
        return Array.isArray(filter.value) && filter.value.includes(value);
      default:
        return true;
    }
  }

  /**
   * Retourne l'état actuel du filtre
   */
  getState() {
    return {
      filters: this.filters,
      sorts: this.sorts,
      limit: this.limit,
      offset: this.offset,
    };
  }

  /**
   * Réinitialise tout
   */
  reset(): this {
    this.filters = [];
    this.sorts = [];
    this.limit = undefined;
    this.offset = 0;
    return this;
  }
}
