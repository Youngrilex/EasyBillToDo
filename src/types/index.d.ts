interface TodoItem {
  id: number;
  todo: string;
  desc: string;
}

type todoState = {
  todos: TodoItem[];
  isEdit: boolean;
};

type RootStackParamList = {
  Todo: undefined;
  AddTodo: undefined;
};

type BottomTabParamList = {
  Todo: undefined;
  Search: undefined;
  AddTodo: undefined;
  User: undefined;
};
