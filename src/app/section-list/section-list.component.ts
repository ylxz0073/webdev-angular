import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {SectionServiceClient} from '../services/section.service.client';
import {CourseServiceClient} from '../services/course.service.client';
import {forEach} from '@angular/router/src/utils/collection';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  constructor(private service: SectionServiceClient,
              private courseService: CourseServiceClient,
              private sectionService: SectionServiceClient,
              private userService: UserServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadSections(params['courseId']));
  }

  isEnrolledAnySection = false;
  isDataLoaded = false;
  sectionName = '';
  seats = '';
  courseId = '';
  sections = [];
  enrolledSections = [];
  enrolledSectionIds: number[] = [];
  curUser;
  loadSections(courseId) {
    this.courseId = courseId;
    this.getCurrentUser()
      .then(() => { console.log(this.curUser);
        if (this.curUser) {
      this.courseService
        .findCourseById(courseId)
        .then((course) => this.sectionName = course.title + ' Section 1')
        .then(() => this.loadSectionsForStudent())
        .then(() => this.loadSectionsForCourse())
        .then(() => this.isDataLoaded = true);
    } else {
        this.courseService
          .findCourseById(courseId)
          .then((course) => this.sectionName = course.title + ' Section 1')
          .then(() => this.loadSectionsForCourse())
          .then(() => this.isDataLoaded = true);
      }
      });
  }
  getCurrentUser() {
    return this.userService.profile()
      .then((user) => this.curUser = user);
  }
  loadSectionsForStudent() {
    return this.sectionService
      .findSectionsForStudent()
      .then(sections => {
        console.log(sections);
        sections.forEach( (s) => {
          this.enrolledSectionIds.push(s.section._id);
        });
         return this.enrolledSections = sections;
      } );
  }
  loadSectionsForCourse() {
    return this
      .service
      .findSectionsForCourse(this.courseId)
      .then(sections => {
        console.log(sections);
        return this.sections = sections;
      });
  }

  createSection(sectionName, seats) {
    this
      .service
      .createSection(this.courseId, sectionName, seats)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }

  enroll(section) {
    // alert(section._id);
    if (!this.curUser) {
      alert('please login to enroll');
      this.router.navigate(['login']);
    } else if (section.seats <= 0) {
      alert('no seat available');
    } else {
      if (this.isEnrolledAnySection) {
        alert('you can only enroll in one section');
      } else {
        this.service
          .enrollStudentInSection(section._id)
          .then(() => {
            this.router.navigate(['profile']);
          });
      }
    }
  }
  unenroll(sectionId) {
    this.service
      .unenrollStudentFromSection(sectionId)
      .then(() => {
        this.isEnrolledAnySection = false;
        this.router.navigate(['profile']);
      });
  }
  isEnrolled(sectionId) {
    // console.log(sectionId);
    // console.log(this.enrolledSectionIds);
    // console.log(this.enrolledSectionIds.indexOf(sectionId));
    const result = this.enrolledSectionIds.indexOf(sectionId) >= 0;
    if (result) { this.isEnrolledAnySection = true; }
    return result;
  }

  ngOnInit() {
  }

}
