export class WidgetServiceClient {
  findWidgetsForTopic(topicId) {
    return fetch('http://localhost:8080/api/topic/' + topicId + '/widget')
      .then(response => {
        return response.json();
      });
  }
  findAssignmentWidgetsForTopics(topicId) {
    return fetch('http://localhost:8080/api/topic/' + topicId + '/assignment')
      .then(response => response.json());
  }

  findExamWidgetsForTopics(topicId) {
    return fetch('http://localhost:8080/api/topic/' + topicId + '/exam')
      .then(response => response.json());
  }
}
