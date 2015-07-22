# cerebral-angular-immutable-store
A cerebral package for angular and immutable-store

## Debugger
You can download the Chrome debugger [here](https://chrome.google.com/webstore/detail/cerebral-debugger/ddefoknoniaeoikpgneklcbjlipfedbb?hl=no).

## More info on Cerebral and video introduction
Cerebral main repo is located [here](https://github.com/christianalfoni/cerebral) and a video demonstration can be bound [here](https://www.youtube.com/watch?v=xCIv4-Q2dtA).

## Install
`npm install cerebral-angular-immutable-store`
or
`bower install cerebral-angular-immutable-store`

## Get started

```js
angular.module('app', ['cerebral'])
  .config(function (cerebralProvider) {

    // Sets the initial state of the app
    cerebralProvider.setState({
      list: ['foo']
    });

    // Sets default arguments passed to all signals
    cerebralProvider.setDefaultArgs({
      foo: 'bar'
    });

  })
  .directive ('myComponent', function () {
    return {
      controllerAs: 'myComponent',
      scope: {},
      templateUrl: 'myComponent.html',
      controller: function ($scope, cerebral) {

        // Adds a "list" prop to the $scope which
        // will automatically update when the list
        // updates
        cerebral.injectState($scope, {
          list: ['list']
        });

        // Trigger signals
        $scope.addItem = function () {
          cerebral.signals.addItemClicked();
        };

      }
    };
  })
  .run(function (cerebral) {

    // Create actions
    var addItem =  function addItem (args, state) {
      state.push('list', 'bar');
    };

    // Create signals
    cerebral.signal('addItemClicked', addItem);

  });
```

## Try it out
1. Clone repo
2. `npm install`
3. `npm start`
4. Go to `localhost:8080`
