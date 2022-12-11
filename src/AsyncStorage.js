import AsyncStorage from '@react-native-async-storage/async-storage';

const timerDataKey = 'ThisIsTimerDataKey';

export const getTimerData = async () => {
	try {
		const data = await AsyncStorage.getItem(timerDataKey);
		return JSON.parse(data) || null;
	} catch (error) {
		console.log('=======error fetching timer data please handle me====', error);
	}
};

export const saveTimerData = async (data) => {
	try {
		await AsyncStorage.setItem(timerDataKey, JSON.stringify(data));
	} catch (error) {
		console.log('=======error saving timer data please handle me====', error);
	}
};
