import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { styled } from 'nativewind';
import {
  useCreateTodoMutation,
  useUpdateTodoMutation,
} from '../redux/features/todo/todoApi';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const todoSchema = z.object({
  todo: z.string().min(1, 'Task is required'),
  desc: z.string().min(1, 'Description is required'),
});

type TodoSchema = z.infer<typeof todoSchema>;

const AddTodo = ({ navigation, route }: any) => {
  const [createTodo, { isLoading, error }] = useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const { todo } = route.params || {};
  const [isEdit, setIsEdit] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<TodoSchema>({
    defaultValues: {
      todo: '',
      desc: '',
    },
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    if (todo?.id) {
      setValue('todo', todo.title);
      setValue('desc', todo.description);
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [todo, setValue]);

  const addTodo: SubmitHandler<TodoSchema> = async (todo: TodoSchema) => {
    try {
      if (isEdit) {
        await updateTodo({ id: Date.now(), ...todo }).unwrap();
        navigation.navigate('Todo');
        return;
      }
      await createTodo({ id: Date.now(), ...todo }).unwrap();
      navigation.navigate('Todo');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledView className="flex-1 p-4">
      <StyledText className="text-2xl mb-4 text-center capitalize">
        {isEdit ? 'Update' : 'Create'} Todo
      </StyledText>
      <StyledView className="space-y-4 mb-4">
        <StyledView>
          <StyledText className="text-base mb-2 capitalize">Todo</StyledText>
          <StyledTextInput
            className="border border-solid border-gray-800 p-2 rounded"
            placeholder="Add a new task"
            value={watch('todo')}
            onChangeText={(text) => setValue('todo', text)}
          />
          {errors.todo && (
            <StyledText className="text-red-500">
              {errors.todo.message}
            </StyledText>
          )}
        </StyledView>
        <StyledView>
          <StyledText className="text-base mb-2 capitalize">
            Description
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 px-2 py-5 rounded"
            placeholder="Add task description"
            numberOfLines={6}
            multiline
            textAlignVertical="top"
            value={watch('desc')}
            onChangeText={(text) => setValue('desc', text)}
          />
          {errors.desc && (
            <StyledText className="text-red-500">
              {errors.desc.message}
            </StyledText>
          )}
        </StyledView>
        <StyledTouchableOpacity
          className="w-full bg-green-400 flex items-center justify-center rounded p-2"
          onPress={handleSubmit(addTodo)}
          disabled={isLoading}
        >
          <StyledText className="text-lg font-semibold text-white">
            {isLoading ? 'Loading...' : isEdit ? 'Update Todo' : 'Create Todo'}
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default AddTodo;
