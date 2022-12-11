/**
 * @format
 */

import { AppRegistry } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';
import { HeadlessTask } from './Headless';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('Timer', () => HeadlessTask);
