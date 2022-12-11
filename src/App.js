import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, NativeModules } from 'react-native';

import { getTimerData, saveTimerData } from './AsyncStorage';
import { Arcs } from './ArcCreator';
import { addTimerEvent, removeTimerEvent } from './Events';

const { Timer } = NativeModules;

const buttons = {
	Sleep: { color: '#11ccff' },
	Calm: { color: '#ebeb34' },
	Cry: { color: '#bf80b9' },
};

const ServiceButton = ({ changeState, color, text, state }) => {
	return (
		<TouchableOpacity
			onPress={() => {
				changeState(text);
			}}
			style={[styles.stateButton, state === text ? styles.selectedStateButton : {}, { backgroundColor: color }]}
		>
			<Text>{text}</Text>
		</TouchableOpacity>
	);
};

const App = () => {
	const [state, changeState] = useState('Calm');
	const [hasStarted, changeServiceStatus] = useState(false);
	const [time, changeTime] = useState(0);
	const [dataFetched, setFetchedData] = useState(null);

	useEffect(async () => {
		let data;
		(async () => {
			data = await getTimerData();
			setFetchedData(data || [{ state, color: buttons[state].color, startTime: 0 }]);
		})();
		addTimerEvent(onTimerChange);
		return () => removeTimerEvent(onTimerChange);
	}, []);

	const onTimerChange = async ({ time, cb }) => {
		// If app is killed and service is running the change the service button text.
		!hasStarted && changeServiceStatus(true);
		if (time == 3600) {
			cb();
			Timer.stopService();
			changeServiceStatus(false);
			changeTime(0);
			await saveTimerData([]);
		} else {
			changeTime(time);
		}
	};

	if (!dataFetched) {
		return (
			<SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator color={'green'} size={'large'} />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView>
			<Arcs time={time} state={state} buttons={buttons} initialData={dataFetched} />
			<View style={styles.stateView}>
				{Object.keys(buttons).map((i, ix) => {
					return (
						<ServiceButton
							key={`ServiceButton${ix}`}
							state={state}
							changeState={changeState}
							text={i}
							color={buttons[i].color}
						/>
					);
				})}
			</View>
			<TouchableOpacity
				style={styles.startOrStopButton}
				onPress={() => {
					!hasStarted ? Timer.startService() : Timer.stopService();
					changeServiceStatus(!hasStarted);
				}}
			>
				<Text style={styles.startOrStopText}>{hasStarted ? 'Stop' : 'Start'}</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	stateView: { flexDirection: 'row', justifyContent: 'space-evenly' },
	stateButton: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 5,
		marginTop: 20,
	},
	selectedStateButton: {
		borderWidth: 1,
	},
	startOrStopButton: { backgroundColor: '#627799', alignItems: 'center', marginHorizontal: '5%', marginTop: 20, borderRadius: 5 },
	startOrStopText: { color: 'white', paddingVertical: 10 },
});

export default App;
