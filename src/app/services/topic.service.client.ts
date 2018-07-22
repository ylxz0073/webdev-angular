export class TopicServiceClient {
  findTopicsForLesson(lessonId) {
    return fetch('http://localhost:8080/api/course/:courseId/module/:moduleId/lesson/' + lessonId + '/topic')
      .then(response => response.json());
  }
}
