import './../node_modules/todomvc-common/base.css';
import './../node_modules/todomvc-app-css/index.css';

import angular from 'angular';
import './../index.js';
import config from './config.js';
import run from './run.js';

import TodoMVC from './components/TodoMVC.js';
import TodoList from './components/TodoList.js';

angular.module('todomvc', ['cerebral'])
  .config(config)

  // Components
  .directive('todoMvc', TodoMVC)
  .directive('todoList', TodoList)
  .run(run);
