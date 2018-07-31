import {teacherUrl} from '../constant';

export class TopicServiceClient {
  findTopicsForLesson(lessonId) {
    return fetch(teacherUrl + '/api/course/:courseId/module/:moduleId/lesson/' + lessonId + '/topic')
      .then(response => response.json());
  }
}
