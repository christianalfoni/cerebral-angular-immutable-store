import angular from 'angular';
import Controller from './../index.js';

angular.module('app', ['cerebral'])
  .config(function (cerebralProvider) {
    console.log(cerebralProvider);
    cerebralProvider.setState({
      list: ['foo']
    });
  })
  .directive ('myComponent', function () {
    return {
      controllerAs: 'myComponent',
      scope: {},
      templateUrl: 'myComponent.html',
      controller: function ($scope, cerebral) {

        cerebral.injectState($scope, {
          list: ['list']
        });

        $scope.addItem = function () {
          cerebral.signals.addItemClicked();
        };

      }
    };
  })
  .run(function (cerebral) {

    cerebral.signal('addItemClicked', function AddItem (args, state) {
      state.push('list', 'bar');
    })

  });
