import {teacherUrl} from '../constant';

export class WidgetServiceClient {
  findWidgetsForTopic(topicId) {
    return fetch(teacherUrl + '/api/topic/' + topicId + '/widget')
      .then(response => {
        return response.json();
      });
  }
  findAssignmentWidgetsForTopics(topicId) {
    return fetch(teacherUrl + '/api/topic/' + topicId + '/assignment')
      .then(response => response.json());
  }

  findExamWidgetsForTopics(topicId) {
    return fetch(teacherUrl + '/api/topic/' + topicId + '/exam')
      .then(response => response.json());
  }
}
