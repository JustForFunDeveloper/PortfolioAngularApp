import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/services/data-storage.service';
import {AuthService} from '../auth/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe( user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.authService.user.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
    // this.dataStorageService.storeShoppingList();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
    // this.dataStorageService.fetchShoppingList();
  }

  onLogout() {
    this.authService.logout();
  }
}
