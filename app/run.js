import {
  addTodo,
  setNewTodoTitle,
  setVisibleTodos,
  resetNewTodoTitle,
  countTodos,
  toggleAllCompleted,
  toggleCompleted,
  removeTodo
} from './actions.js';

export default function (cerebral) {

  cerebral.signal('newTodoSubmitted', addTodo, resetNewTodoTitle, countTodos, setVisibleTodos);
  cerebral.signal('completeAllToggled', toggleAllCompleted, countTodos);
  cerebral.signal('newTodoTitleChanged', setNewTodoTitle);
  cerebral.signal('completedToggled', toggleCompleted);
  cerebral.signal('todoRemoved', removeTodo, setVisibleTodos, countTodos);

};
