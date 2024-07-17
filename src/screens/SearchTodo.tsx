import { styled } from 'nativewind';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);

const StyledTouchableOpacity = styled(TouchableOpacity);

function SearchTodo() {
  return (
    <StyledView className="flex-1 mx-4 py-4">
      <StyledText className="text-lg text-center">Search Todo</StyledText>
      <StyledTextInput className="border border-solid border-gray-800 p-2 rounded   mt-4" />
      <StyledTouchableOpacity className="bg-pink-400 p-2 rounded mt-4">
        <StyledText className="text-white text-center text-lg">
          Search
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
}

export default SearchTodo;
