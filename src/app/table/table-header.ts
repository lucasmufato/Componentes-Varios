import {Pipe} from '@angular/core';
export interface TableHeader {
  label: string;
  field: string;
  sortable?: boolean;
  filterable?: boolean;
  ordenado?: string;
  pipe?: Pipe;
  pipeArgs?: string[]|string;
}
