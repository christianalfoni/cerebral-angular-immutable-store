export default {
  addTodo(args, state) {
    let ref = state.get('nextRef');

    state.set(['todos', ref], {
      $ref: ref,
      $isSaving: true,
      title: state.get('newTodoTitle'),
      completed: false
    });
    state.set('nextRef', ++ref);

    return {
      ref: ref
    };

  },
  resetNewTodoTitle(args, state) {
    state.set('newTodoTitle', '');
  },
  setNewTodoTitle(args, state) {
    state.set('newTodoTitle', args.title);
  },
  setVisibleTodos(args, state) {
    const todos = state.get('todos');
    const filter = state.get('filter');
    const visibleTodos = Object.keys(todos).filter(function (todoRef) {
      return (
        filter === 'all'
      )
    });
    state.set('visibleTodos', visibleTodos);
  },
  countTodos(args, state) {
    const todos = state.get('todos');
    const count = Object.keys(todos).reduce(function (count, todoRef) {
      if (todos[todoRef].completed) {
        count.completed++;
      } else {
        count.remaining++;
      }
      return count;
    }, {remaining: 0, completed: 0});
    state.merge({
      remainingCount: count.remaining,
      completedCount: count.completed
    });
  },
  toggleAllCompleted(args, state) {
      const isAllCompleted = state.get('isAllCompleted');
      const visibleTodos = state.get('visibleTodos').forEach(function (todo) {
        if (isAllCompleted) {
          state.set(['todos', todo.$ref, 'completed'], false);
        } else {
          state.set(['todos', todo.$ref, 'completed'], true);
        }
      });
  },
  toggleCompleted(args, state) {
    const todo = state.get(['todos', args.ref]);
    state.set(['todos', args.ref, 'completed'], !todo.completed);
  },
  removeTodo(args, state) {
    state.unset('todos', args.ref);
  }
};
