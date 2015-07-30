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

Please go to main repo [Cerebral](https://github.com/christianalfoni/cerebral) to read more about signals.

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
Actions is where it all happens. This is where you define mutations to your application state based on information sent from the VIEW layer. Actions are pure functions that can run synchronously and asynchronously. They are easily reused across signals and can easily be tested.

In larger application you should consider putting each action in its own file.

*actions.js*
```js
export default {
  // Define an action with a function. It receives two arguments when run
  // synchronously
  setLoading(args, state) {
    state.set('isLoading', true);
  },

  // There are many types of mutations you can do, "set" is just one of them
  unsetLoading(args, state) {
    state.set('isLoading', false);
  },

  // When an action is run asynchronously it receives a third argument,
  // a promise you can either resolve or reject. In addition to any default
  // args you configure, you also have access to common Angular services, like
  // $http
  saveForm(args, state, promise) {
    args.services.$http.post('/form', args.formData)
      .success(function () {
        promise.resolve();
      })
      .error(function () {
        promise.reject();
      });
  };  
};
```

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

### Mutations
You can do any traditional mutation to the state, the signature is just a bit different. You call the kind of mutation first, then the path and then an optional value. The path can either be a string or an array for nested paths.
```js
const someAction = function someAction (args, state) {
  state.set('isLoading', false);
  state.unset('isLoading');
  state.merge('user', {name: 'foo'});
  state.push('list', 'foo');
  state.unshift('list', 'bar');
  state.pop('list');
  state.shift('list');
  state.concat('list', [1, 2, 3]);
  state.splice('list', 1, 1, [1]);

  state.push(['admin', 'users'], {foo: 'bar'});

};
```

### Get state in actions
```js
const someAction = function someAction (args, state) {
  const isLoading = state.get('isLoading');
};
```

### Async actions
```js
const someAction = function someAction (args, state, promise) {
  args.utils.ajax('/foo', function (err, result) {
    if (err) {
      promise.reject({error: err});
    } else {
      promise.resolve({result: result});
    }
  })
};
```
You can optionally redirect resolved and rejected async actions to different actions by inserting an object as the last entry in the async array definition.
```js
controller.signal('formSubmitted',
  setLoading,
  [saveForm, {
    resolve: [closeModal],
    reject: [setFormError]
  }],
  unsetLoading
);
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
