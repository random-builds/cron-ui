import { expect, test } from 'vitest';
import type { Schedule } from './helper';
import { getCronString, compactCronString } from './helper';

const placeholderArray: number[] = Array(60);

test('all day of week every minute of every hour', () => {
	expect(
		getCronString({
			type: 'dow',
			dayOfWeek: [...placeholderArray.keys().take(7)],
			month: [],
			day: [],
			hour: [...placeholderArray.keys().take(24)],
			minute: [...placeholderArray.keys().take(60)]
		})
	).toBe('* * * * *');
});

test('all day of month every minute of every hour', () => {
	expect(
		getCronString({
			type: 'dom',
			dayOfWeek: [],
			month: [
				...placeholderArray
					.keys()
					.take(12)
					.map((i) => i + 1)
			],
			day: [
				...placeholderArray
					.keys()
					.take(31)
					.map((i) => i + 1)
			],
			hour: [...placeholderArray.keys().take(24)],
			minute: [...placeholderArray.keys().take(60)]
		})
	).toBe('* * * * *');
});

test('cron string is properly ordered - 1', () => {
	expect(
		getCronString({
			type: 'dow',
			dayOfWeek: [5],
			month: [1],
			day: [2],
			hour: [3],
			minute: [4]
		})
	).toBe('4 3 * * 5');
});

test('cron string is properly ordered - 2', () => {
	expect(
		getCronString({
			type: 'dom',
			dayOfWeek: [],
			month: [1],
			day: [2],
			hour: [3],
			minute: [4]
		})
	).toBe('4 3 2 1 *');
});

test('compact cron string with 1 value returns itself', () => {
	expect(compactCronString([1], 7)).toBe('1');
});

test('compact cron string with max length returns *', () => {
	expect(compactCronString([1, 2, 3], 3)).toBe('*');
});

test('compact cron string with consecutive numbers below max length - 1', () => {
	expect(compactCronString([0, 1], 7)).toBe('0-1');
});

test('compact cron string with consecutive numbers below max length - 2', () => {
	expect(compactCronString([2, 3, 4, 5], 7)).toBe('2-5');
});

test('compact cron string with consecutive numbers below max length - 3', () => {
	expect(compactCronString([1, 2, 4, 5], 7)).toBe('1-2,4-5');
});

test('compact cron string with non-consecutive numbers below max length', () => {
	expect(compactCronString([1, 3, 5, 7], 10)).toBe('1,3,5,7');
});

test('compact cron string with both consecutive and non-consecutive numbers below max length - 1', () => {
	expect(compactCronString([1, 3, 5, 7, 8, 9], 20)).toBe('1,3,5,7-9');
});

test('compact cron string with both consecutive and non-consecutive numbers below max length - 2', () => {
	expect(compactCronString([7, 8, 9, 11, 13, 15], 20)).toBe('7-9,11,13,15');
});

test('compact cron string with both consecutive and non-consecutive numbers below max length - 3', () => {
	expect(compactCronString([1, 3, 5, 7, 8, 9, 10, 11, 13, 15], 20)).toBe('1,3,5,7-11,13,15');
});
