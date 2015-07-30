export default function () {
  return {
    controllerAs: 'todoList',
    scope: {},
    templateUrl: 'TodoList.html',
    controller: function ($scope, cerebral) {

      cerebral.injectState($scope, {
        todos: ['todos'],
        hasTodos: ['hasTodos'],
        isAllCompleted: ['isAllCompleted'],
        remainingCount: ['remainingCount'],
        visibleTodos: ['visibleTodos']
      });

      $scope.completeAllToggled = cerebral.signals.completeAllToggled;

      $scope.completedToggled = function (ref) {
        cerebral.signals.completedToggled({ref: ref});
      };

      $scope.todoRemoved = function (ref) {
        cerebral.signals.todoRemoved({ref: ref});
      };

    }
  };
};
