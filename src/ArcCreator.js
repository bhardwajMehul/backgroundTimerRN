import React, { useState, useEffect } from 'react';
import Svg, { Path, Text } from 'react-native-svg';

import { saveTimerData } from './AsyncStorage';

const centerX = 150,
	centerY = 150,
	radius = 85,
	strokeWidth = 30;

export const Arcs = ({ time, state, buttons, initialData }) => {
	const [arcs, updateArcs] = useState([]);

	useEffect(() => {
		let array = [];
		if (arcs.length == 0) {
			array = initialData;
		} else if (!!arcs && arcs.length > 1) {
			array = [
				...arcs.slice(0, arcs.length - 1),
				{ ...arcs[arcs.length - 1], endTime: time },
				{ state, color: buttons[state].color, startTime: time },
			];
		} else {
			array = [
				{ ...arcs[arcs.length - 1], endTime: time },
				{ state, color: buttons[state].color, startTime: time },
			];
		}
		updateArcs(array);
		saveTimerData(array);
	}, [state]);

	const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
		var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

		return {
			x: centerX + radius * Math.cos(angleInRadians),
			y: centerY + radius * Math.sin(angleInRadians),
		};
	};

	const describeArc = (x, y, radius, startAngle, endAngle) => {
		var start = polarToCartesian(x, y, radius, endAngle);
		var end = polarToCartesian(x, y, radius, startAngle);
		var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
		var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
		return d;
	};

	const getTextFromTime = (time) => {
		const minutes = Math.floor(time / 60) > 9 ? Math.floor(time / 60) : `0${Math.floor(time / 60)}`;
		const seconds = time % 60 > 9 ? time % 60 : `0${time % 60}`;
		return `${minutes}:${seconds}`;
	};

	return (
		<Svg height="300" width="300">
			<Path d={describeArc(centerX, centerY, radius, 0, 359.9999)} stroke={'#aeb2b8'} strokeWidth={strokeWidth} />
			{arcs.map(({ color, startTime, endTime }, ix) => (
				<Path
					key={`ArcKey${ix}`}
					d={describeArc(centerX, centerY, radius, startTime / 10, !!endTime ? endTime / 10 : time / 10)}
					stroke={color}
					strokeWidth={strokeWidth}
				/>
			))}
			<Text x={`${centerX}`} y={`${centerY}`} textAnchor="middle" fontWeight="bold" fill="black">
				{getTextFromTime(time)}
			</Text>
		</Svg>
	);
};
