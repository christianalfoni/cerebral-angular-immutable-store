export default function () {
  return {
    controllerAs: 'todoMVC',
    scope: {},
    templateUrl: 'TodoMVC.html',
    controller: function ($scope, cerebral) {

      cerebral.injectState($scope, {
        isSaving: ['isSaving'],
        newTodoTitle: ['newTodoTitle']
      });

      $scope.newTodoTitleChanged = function () {
        cerebral.signals.newTodoTitleChanged({title: $scope.newTodoTitle});
      };
      $scope.newTodoSubmitted = cerebral.signals.newTodoSubmitted;

    }
  };
};
