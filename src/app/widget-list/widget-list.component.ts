import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetServiceClient} from '../services/widget.service.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  constructor(private service: WidgetServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.setParams(params));
  }

  isDataLoaded = false;
  courseId;
  moduleId;
  lessonId;
  topicId;
  widgetId;
  widgets = [];
  assignments = [];
  exams = [];

  setParams(params) {
    this.courseId = params['courseId'];
    this.moduleId = params['moduleId'];
    this.lessonId = params['lessonId'];
    this.topicId = params['topicId'];
    this.widgetId = params['widgetId'];
    if (this.topicId) {
      this.loadWidgets(this.topicId)
        .then(() => {
          this.widgets.sort(this.compareById);
          this.isDataLoaded = true;
        });
    }
  }

  splitListItem(listItemsText) {
    return listItemsText.split(/\r?\n/);
  }

  compareById(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  loadWidgets(topicId) {
    this.topicId = topicId;
    return this.service.findWidgetsForTopic(topicId)
      .then(widgets => this.widgets = widgets);
  }
  loadAssignments(topicId) {
    this.topicId = topicId;
    return this.service.findAssignmentWidgetsForTopics(topicId)
      .then(widgets => this.assignments = widgets);
  }
  loadExams(topicId) {
    this.topicId = topicId;
    return this.service.findExamWidgetsForTopics(topicId)
      .then(widgets => this.exams = widgets);
  }

  ngOnInit() {
  }

}
