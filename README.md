## This the background timer RN project.

The idea to build this background service in android is to start a background service and create a headless JS task. So after every second the JS code will run which is registered like. __AppRegistry.registerHeadlessTask('Timer', () => HeadlessTask);__.
This code in HeadlessTask run when the app in background, foreground, and even when the app is killed.

The data of the arcs is saved in async storage. So even when the app is killed the data will be saved.

Regards Mehul Bhardwaj

### Note- The app is targeted to run in android, and is bit unstable.