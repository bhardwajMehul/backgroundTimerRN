import { EventEmitter } from 'events';

const appEvents = new EventEmitter();

appEvents.setMaxListeners(0);

export const addTimerEvent = (cb) => {
	appEvents.addListener('Timer', cb);
};

export const emitTimerEvent = (data) => {
	appEvents.emit('Timer', data);
};

export const removeTimerEvent = (cb) => {
	appEvents.removeListener('Timer', cb);
};
