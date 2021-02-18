export class CorePagination<T> {
  qyt = 10;
  page = 1;
  pages: number;
  total: number;
  isAll?:boolean;
  results: T[];
}
