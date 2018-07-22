import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TopicServiceClient} from '../services/topic.service.client';

@Component({
  selector: 'app-topic-tabs',
  templateUrl: './topic-tabs.component.html',
  styleUrls: ['./topic-tabs.component.css']
})
export class TopicTabsComponent implements OnInit {

  constructor(private service: TopicServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.setParams(params));
  }

  isDataLoaded = false;
  courseId;
  moduleId;
  lessonId;
  topicId;
  topics = [];

  setParams(params) {
    this.courseId = params['courseId'];
    this.moduleId = params['moduleId'];
    this.lessonId = params['lessonId'];
    this.topicId = params['topicId'];
    if (this.lessonId) {
      this.loadTopics(this.lessonId);
    }
  }

  loadTopics(lessonId) {
    this.lessonId = lessonId;
    this.service.findTopicsForLesson(lessonId)
      .then(topics => this.topics = topics)
      .then(() => {
        this.isDataLoaded = true;
      });
  }
  ngOnInit() {

  }

}
