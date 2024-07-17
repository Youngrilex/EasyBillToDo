import { styled } from 'nativewind';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLazyGetAllTodosQuery } from '../redux/features/todo/todoApi';
import { TQueryActionCreatorResult } from '../redux/features/apiSlices';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

function Todo({ navigation }: any) {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const [getAllTodos, { isLoading, isError, data, error }] =
    useLazyGetAllTodosQuery();
  const triggerRef = useRef<TQueryActionCreatorResult>();
  let content = <></>;

  const getTodos = useCallback(() => {
    if (triggerRef.current) {
      triggerRef.current.abort();
    }

    triggerRef.current = getAllTodos({});
  }, [getAllTodos]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const renderItem = ({ item }: { item: TodoItem }) => (
    <StyledView className="flex-row justify-between items-center p-2 border-b border-gray-200">
      <StyledView className="flex-1 gap-2 h-32">
        <StyledText className="text-lg  text-pink-400">{item.todo}</StyledText>
        <StyledText className="text-sm">{item.desc}</StyledText>
        <StyledText className="text-sm">
          {new Date(item.id).toDateString()}
        </StyledText>
      </StyledView>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddTodo', { todo: item });
        }}
      >
        <Feather name="edit" size={20} color="green" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <MaterialIcons name="delete" size={20} color="red" />
      </TouchableOpacity>
    </StyledView>
  );

  if (isLoading) {
    content = <StyledText>Loading...</StyledText>;
  }

  if (!isLoading && isError) {
    content = (
      <StyledView>
        <StyledView>
          <StyledText className="text-red-500">Failed to get todos</StyledText>
          <StyledTouchableOpacity onPress={getTodos}>
            <StyledText className="text-gren-500">Retry</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    );
  }

  if (!isLoading && !isError && data) {
    content = (
      <StyledView className="flex-1 p-4">
        <StyledView className="flex-row items-center justify-between">
          <StyledText className="text-2xl mb-4">Todo List</StyledText>
          <StyledTouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Feather name="search" size={24} color="black" />
          </StyledTouchableOpacity>
        </StyledView>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onRefresh={getTodos}
          refreshing={isLoading}
        />
      </StyledView>
    );
  }
  return <>{content}</>;
}

export default Todo;
