import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MessagelogDataSource } from './messagelog-datasource';

@Component({
   selector: 'app-messagelog',
   templateUrl: './messagelog.component.html',
   styleUrls: ['./messagelog.component.scss']
})
export class MessagelogComponent implements AfterViewInit {
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   dataSource: MessagelogDataSource;

   /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
   displayedColumns = ['id', 'name', 'desc'];

   ngAfterViewInit() {
      this.dataSource = new MessagelogDataSource(this.paginator, this.sort);
   }
}
