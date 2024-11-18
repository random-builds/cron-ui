export interface Schedule {
	type: 'dom' | 'dow';
	dayOfWeek: number[];
	month: number[];
	day: number[];
	hour: number[];
	minute: number[];
}

export interface Job {
	name: string;
	description: string;
	schedules: Schedule[];
}

export function getCronString(schedule: Schedule) {
	if (schedule.hour.length === 0 || schedule.minute.length === 0) {
		throw new Error('hour and minute must not be empty');
	}
	if (schedule.type === 'dom' && (schedule.month.length === 0 || schedule.day.length === 0)) {
		throw new Error('month and day must not be empty');
	}
	if (schedule.type === 'dow' && schedule.dayOfWeek.length === 0) {
		throw new Error('dayOfWeek must not be empty');
	}
	let dayOfWeek, month, day, hour, minute;
	if (schedule.type === 'dow') {
		dayOfWeek = compactCronString(schedule.dayOfWeek, 7);
		month = '*';
		day = '*';
	} else {
		dayOfWeek = '*';
		month = compactCronString(schedule.month, 12);
		day = compactCronString(schedule.day, 31);
	}
	hour = compactCronString(schedule.hour, 24);
	minute = compactCronString(schedule.minute, 60);
	return minute + ' ' + hour + ' ' + day + ' ' + month + ' ' + dayOfWeek;
}

export function compactCronString(cronNumbers: number[], maxLength: number) {
	if (cronNumbers.length === 1) {
		return cronNumbers[0].toString();
	}
	if (cronNumbers.length === maxLength) {
		return '*';
	}
	let output = '';
	let start = -1;
	let mid = -1;
	for (const i of cronNumbers) {
		if (start === -1) {
			start = i;
			output += start;
		} else if (start + 1 === i || mid + 1 === i) {
			// consecutive number
			mid = i;
		} else if (mid === -1) {
			// non-consecutive after non-consecutive
			output += ',' + i;
			start = i;
		} else {
			// non-consecutive after consecutive
			output += '-' + mid + ',' + i;
			start = i;
			mid = -1;
		}
	}
	if (mid !== -1) {
		output += '-' + mid;
	}
	return output;
}
