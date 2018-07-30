import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {SectionServiceClient} from '../services/section.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private router: Router) { }

  user;
  username;
  password;
  sections = [];
  update() {
    this.service.updateUser(this.user._id, this.user)
      .then(user => {this.user = user;
      console.log(user); });
  }

  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }

  ngOnInit() {
    this.service
      .profile()
      .then((user) => {
        this.user = user;
        console.log(user);
      });

    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections );
  }


}
