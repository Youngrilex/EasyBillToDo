To-Do List Mobile Application

Description
This is a simple mobile application for managing a to-do list. The application allows users to create, view, update, and delete to-do items. It is built using React Native, with Redux for state management, and AsyncStorage for local data persistence. The user interface is designed to be simple and user-friendly.

Features
Create a new to-do item: Add a new task to your to-do list.
View all to-do items: See a list of all your to-do items.

Update a to-do item: Edit the title or description of an existing task.
Delete a to-do item: Remove a task from your to-do list.

Requirements
Node.js (>= 14.x)
npm or yarn
Expo CLI
Android Studio or Xcode (for running on Android or iOS)

Installation
Clone the repository:
git clone https://github.com/youngrilex/easybilltodo.git
cd easybilltodo

Install dependencies:
npm install
# or
yarn 

Run the application:

For iOS:
yarn run ios

For Android:
yarn run android

First time running mobile app? Install Expo CLI
Install Expo CLI globally using npm or yarn:
npm install -g expo-cli
# or
yarn global add expo-cli

Start the Expo server:
npx expo start

# runing the local server used for persisting data on the application
yarn run json-server
