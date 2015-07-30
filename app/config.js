const hasTodos = function () {
  return {
    value: false,
    deps: {todos: ['todos']},
    get(value, deps) {
      return !!Object.keys(deps.todos).length;
    }
  };
};

const visibleTodos = function () {
  return {
    value: [],
    deps: {todos: ['todos']},
    get(refs, deps) {
      return refs.map((ref) => deps.todos[ref]);
    }
  };
};

const isAllCompleted = function () {
  return {
    value: false,
    deps: {visibleTodos: ['visibleTodos'], todos: ['todos']},
    get(value, deps) {
      return deps.visibleTodos.reduce(function (isAllCompleted, todo) {
        if (!todo.completed) {
          return false;
        }
        return isAllCompleted;
      }, true);
    }
  };
};

const state = {
  nextRef: 0,
  isSaving: false,
  newTodoTitle: '',
  remainingCount: 0,
  completedCount: 0,
  todos: {},
  hasTodos: hasTodos,
  visibleTodos: visibleTodos,
  filter: 'all',
  isAllCompleted: isAllCompleted
};


export default function (cerebralProvider) {
  cerebralProvider.setState(state);
};
