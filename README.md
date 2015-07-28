# cerebral-angular-immutable-store
A cerebral package for angular and immutable-store

## Debugger
You can download the Chrome Cerebral Debugger [here](https://chrome.google.com/webstore/detail/cerebral-debugger/ddefoknoniaeoikpgneklcbjlipfedbb?hl=no).

## More info on Cerebral and video introduction
Cerebral main repo is located [here](https://github.com/christianalfoni/cerebral) and a video demonstration can be bound [here](https://www.youtube.com/watch?v=xCIv4-Q2dtA).

## Install
`npm install cerebral-angular-immutable-store`
or
`bower install cerebral-angular-immutable-store`

## Coming from Angular
The way you structure a Cerebral Angular app works quite differently. Instead of creating services and controllers that handles your application state you use **signals**. Signals are a way to handle application flow that gives you a much better overview, a set structure and it can be debugged.

The examples below is just one way of organizing these signals and their actions. Feel free to explore your own ways of doing so.

## Get started

*main.js*
```js
import config from './config.js';
import run from './run.js';
import MyComponent from './components/MyComponents.js';

angular.module('app', ['cerebral'])
  .config(config)
  .directive ('myComponent', MyComponent)
  .run(run);
```

*config.js*
```js
export default function (cerebralProvider) {

  // Sets default arguments passed to all signals
  cerebralProvider.setDefaultArgs({
    foo: 'bar'
  });

  // Sets the initial state of the app. Put all the state of the
  // application in here
  cerebralProvider.setState({
    list: ['foo']
  });

};
```
Read more about [immutable-store](https://github.com/christianalfoni/immutable-store#mapping-state) to understand how mapping of state works.

*run.js*
```js
import {
    addItem
} from './actions.js';

export default function (cerebral) {

  // Create signals
  cerebral.signal('addItemClicked', addItem);

};
```
*actions.js*
```js
export default {
  addItem(args, state) {
    state.push('list', args.item);
  }
};
```

*components/MyComponent.js*
```js
export default function () {
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
      $scope.addItemClicked = function () {
        cerebral.signals.addItemClicked({
          item: 'foo'
        });
      };

    }
  };
};
```

## Try it out
1. Clone repo
2. `npm install`
3. `npm start`
4. Go to `localhost:8080`
