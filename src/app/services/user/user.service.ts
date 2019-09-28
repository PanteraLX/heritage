import { Injectable } from '@angular/core';
import { IUser } from '../../models/user.model';
import { APIService } from '../api/api.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private apiService: APIService) { }

  getAll() {
    return this.apiService.fetch<IUser[]>(`user`);
  }

  register(user: IUser) {
    return this.apiService.post(`user`, user);
  }

  delete(id: string) {
    return this.apiService.delete(`user/${id}`);
  }
}
