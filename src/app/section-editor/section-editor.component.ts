import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionServiceClient} from '../services/section.service.client';
import {CourseServiceClient} from '../services/course.service.client';

@Component({
  selector: 'app-section-editor',
  templateUrl: './section-editor.component.html',
  styleUrls: ['./section-editor.component.css']
})
export class SectionEditorComponent implements OnInit {

  constructor(private service: SectionServiceClient,
              private courseService: CourseServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadSections(params['courseId']));
  }

  isDataLoaded = false;
  sectionName = '';
  seats = '';
  sectionId;
  isEditing = false;
  courseId = '';
  sections = [];
  loadSections(courseId) {
    this.courseId = courseId;
    if (this.courseId) {
      this.courseService
        .findCourseById(courseId)
        .then((course) => this.sectionName = course.title + ' Section 1');
      this
        .service
        .findSectionsForCourse(courseId)
        .then(sections => this.sections = sections)
        .then(() => {
          this.isDataLoaded = true;
          console.log(this.sections);
        });
    }
  }

  createSection(sectionName, seats) {
    this
      .service
      .createSection(this.courseId, sectionName, seats)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }

  editSection(sectionId, section) {
    this.sectionId = sectionId;
    this.sectionName = section.name;
    this.seats = section.seats;
    this.isEditing = true;
  }
  updateSection() {
    this.service.updateSection(this.sectionId, this.sectionName, this.seats)
      .then(() => {
        this.loadSections(this.courseId);
      });
    this.isEditing = false;
    this.sectionId = '';
    this.sectionName = '';
    this.seats = '';
  }
  deleteSection(sectionId) {
    this
      .service
      .deleteSection(sectionId)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }
  enroll(section) {
    // alert(section._id);
    this.service
      .enrollStudentInSection(section._id)
      .then(() => {
        this.router.navigate(['profile']);
      });
  }

  ngOnInit() {
  }

}
