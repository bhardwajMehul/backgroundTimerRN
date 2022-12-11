import { emitTimerEvent } from './src/Events';
let time = 0;

export const HeadlessTask = async () => {
	time += 1;
	emitTimerEvent({
		time,
		cb: () => {
			time = 0;
		},
	});
};
