# cerebral-angular-immutable-store
A cerebral package for angular and immutable-store

## Debugger
You can download the Chrome Cerebral Debugger [here](https://chrome.google.com/webstore/detail/cerebral-debugger/ddefoknoniaeoikpgneklcbjlipfedbb?hl=no).

## More info on Cerebral and video introduction
Cerebral main repo is located [here](https://github.com/christianalfoni/cerebral) and a video demonstration can be found [here](https://www.youtube.com/watch?v=YVmgLReFjLw).

## Install
`npm install cerebral-angular-immutable-store`
or
`bower install cerebral-angular-immutable-store`

## Coming from Angular
The way you structure a Cerebral Angular app works quite differently. Instead of creating services and controllers that handles your application state you use **signals**. Signals are a way to handle application flow that gives you a much better overview, a set structure and it can be debugged.

The examples below is just one way of organizing these signals and their actions. Feel free to explore your own ways of doing so.

## Get started
We are going to use a file structure where we use `main.js`, `run.js` and `config.js`

### The provider
*main.js*
```js
import config from './config.js';

angular.module('app', ['cerebral'])
  .config(config)
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

### Create signals and actions
Creating actions are generic. It works the same way across all packages. Please read about actions at the [Cerebral Repo - Actions](https://github.com/christianalfoni/cerebral#how-to-get-started). You can also watch [a video on creating actions](https://www.youtube.com/watch?v=ylJG4vUx_Tc) to get an overview of how it works.

In larger application you should consider putting each action in its own file.

*run.js*
```js
import {
    setLoading,
    saveForm,
    unsetLoading
} from './actions.js';

export default function (cerebral) {

  // The saveForm action runs async because it is in an array. You can have multiple
  // actions in one array that runs async in parallel.
  controller.signal('formSubmitted', setLoading, [saveForm], unsetLoading);

};
```

*main.js*
```js
import config from './config.js';
import run from './run.js';

angular.module('app', ['cerebral'])
  .config(config)
  .run(run);
```

### Included services
The default args also includes default services from Angular.

```js
const someAction = function someAction (args, state) {
  args.services.$http // Do server fetching etc.
};
```

### Trigger a signal
*components/MyComponent.js*
```js
export default function () {
  return {
    controllerAs: 'myComponent',
    scope: {},
    templateUrl: 'myComponent.html',
    controller: function ($scope, cerebral) {

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

### Get state
When running the application you need to grab the initial state of the application. You can do this with the exposed "get" method.

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

### Recording
With the Cerebral controller you can record and replay state changes.

*components/MyComponent.js*
```js
export default function () {
  return {
    controllerAs: 'myComponent',
    scope: {},
    templateUrl: 'myComponent.html',
    controller: function ($scope, cerebral) {

      // Start recording by passing the initial state of the recording
      cerebral.recorder.record(controller.get());

      // Stop recording
      cerebral.recorder.stop();

      // Seek to specific time and optionally start playback
      cerebral.recorder.seek(0, true);

    }
  };
};
```

## Try it out
1. Clone repo
2. `npm install`
3. `npm start`
4. Go to `localhost:8080`
