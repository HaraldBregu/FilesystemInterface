import { Component, OnInit } from '@angular/core';
import { faFolder, faFolderPlus, faFile, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Catalog } from 'src/app/shared/interfaces/catalog';
import { CatalogService } from 'src/app/shared/services/catalog.service';
import { DashboardModel } from '../store';
import { getCatalogs, getCatalogsSuccess, getCategories, selectCatalog } from '../store/actions';
import { dashboardDataSelector } from '../store/selectors/menu.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  catalogsObservable: Observable<Catalog[]> = new Observable();
  items: Catalog[] = [];

  folderIcon = faFolder;
  addFolderIcon = faFolderPlus;
  fileIcon = faFile;
  addFileIcon = faFileCirclePlus;

  showCatalogs = false;

  menuStateItems$: Observable<DashboardModel> = new Observable<DashboardModel>
  menuItems$: Observable<Catalog[]> = new Observable<Catalog[]>

  constructor(private catalogService: CatalogService, private store: Store) {
    this.menuStateItems$ = this.store.select(dashboardDataSelector);

    this.menuStateItems$.subscribe(item => console.log(item));

    this.menuItems$ = this.menuStateItems$.pipe(map(data => data.catalogs));
  }

  ngOnInit() {

  }

  toggleCatalogs() {
    this.showCatalogs = !this.showCatalogs
    this.store.dispatch(getCatalogs());
  }

  selectCatalog(item: Catalog) {
    this.store.dispatch(selectCatalog(item));
    this.store.dispatch(getCategories({ catalog_name: item.name }));
  }

  getAllCatalogs() {
    this.catalogsObservable = this.catalogService.getAll();
    this.catalogsObservable.pipe(map((data: Catalog[]) => {
      console.log(data)
      this.items = data;
      return data;
    })).subscribe();
  }
}