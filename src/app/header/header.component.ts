import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataStorageService} from '../shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  currentRoute = null;

  constructor(private router: Router,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
    // this.dataStorageService.storeShoppingList();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
    // this.dataStorageService.fetchShoppingList();
  }
}
