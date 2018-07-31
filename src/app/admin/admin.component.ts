import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: UserServiceClient) { }
  isAdmin = false;
  curUser;
  ngOnInit() {
   this.service.profile()
     .then((user) => this.curUser = user)
     .then(() => {
       if (this.curUser && this.curUser.admin) {
         this.isAdmin = true;
       }
     });
  }

}
