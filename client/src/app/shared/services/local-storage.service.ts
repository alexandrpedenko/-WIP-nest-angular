import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public set<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public get<T>(key: string): T {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public delete(key: string): void {
    localStorage.removeItem(key);
  }
}
