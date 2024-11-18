<script lang="ts">
	import type { Schedule, Job } from './helper';

	class ScheduleImpl implements Schedule {
		type: 'dom' | 'dow' = $state('dom');
		dayOfWeek = $state([...placeholderArray.keys().take(7)]);
		month = $state([
			...placeholderArray
				.keys()
				.take(12)
				.map((i) => i + 1)
		]);
		day = $state([
			...placeholderArray
				.keys()
				.take(31)
				.map((i) => i + 1)
		]);
		hour = $state([...placeholderArray.keys().take(24)]);
		minute = $state([...placeholderArray.keys().take(60)]);
	}

	class JobImpl implements Job {
		name = $state('');
		description = $state('');
		schedules: Schedule[] = $state([]);

		constructor() {
			this.schedules.push(new ScheduleImpl());
		}

		addSchedule() {
			this.schedules.push(new ScheduleImpl());
			console.log(this.schedules.length);
		}

		removeSchedule(index: number) {
			this.schedules.splice(index, 1);
			console.log(this.schedules.length);
		}
	}

	const placeholderArray = Array(60);
	let monthShortNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	let dayOfWeekShortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	const job = new JobImpl();
	let isDom = $state(true);
</script>

<div>
	<form id="createJobForm">
		<h1>Create Job</h1>
		<label for="jobName">test</label>
		<input id="jobName" type="text" placeholder="Job Name" bind:value={job.name} required />
		<br />
		<label for="jobDescription">jojo</label>
		<input
			id="jobDescription"
			type="text"
			placeholder="Job Description"
			bind:value={job.description}
			required
		/>
		<br />
		<div id="schedules">
			<h3>schedules</h3>
			{#each job.schedules as schedule, index}
				<div>
					<input
						type="radio"
						name="schedule-type-{index}"
						id="schedule-dom-{index}"
						onclick={() => (isDom = true)}
						checked
					/><label for="schedule-dom-{index}">Day Of Month</label>
					<input
						type="radio"
						name="schedule-type-{index}"
						id="schedule-dow-{index}"
						onclick={() => (isDom = false)}
					/><label for="schedule-dow-{index}">Day Of Week</label>
				</div>
				<div style="display: {isDom ? 'none' : ''}">day of week</div>
				{#each [...placeholderArray.keys().take(7)] as dayOfWeek}
					<span style="display: {isDom ? 'none' : ''}">
						<input
							id="dayOfWeek-{index}-{dayOfWeek}"
							type="checkbox"
							bind:group={schedule.dayOfWeek}
							value={dayOfWeek}
						/>
						<label class="scheduleLabels" for="dayOfWeek-{index}-{dayOfWeek}"
							>{dayOfWeekShortNames[dayOfWeek]}</label
						>
					</span>
				{/each}
				<div style="display: {!isDom ? 'none' : ''}">month</div>
				{#each [...placeholderArray.keys().take(12)] as month}
					<span style="display: {!isDom ? 'none' : ''}">
						<input
							id="month-{index}-{month}"
							type="checkbox"
							bind:group={schedule.month}
							value={month + 1}
						/>
						<label class="scheduleLabels" for="month-{index}-{month}"
							>{monthShortNames[month]}</label
						>
					</span>
				{/each}
				<div style="display: {!isDom ? 'none' : ''}">day</div>
				{#each [...placeholderArray.keys().take(31)] as day}
					<span style="display: {!isDom ? 'none' : ''}">
						<input
							id="day-{index}-{day}"
							type="checkbox"
							bind:group={schedule.day}
							value={day + 1}
						/>
						<label class="scheduleLabels" for="day-{index}-{day}">{day + 1}</label>
					</span>
				{/each}
				<div>hour</div>
				{#each [...placeholderArray.keys().take(24)] as hour}
					<span>
						<input
							id="hour-{index}-{hour}"
							type="checkbox"
							bind:group={schedule.hour}
							value={hour}
						/>
						<label class="scheduleLabels" for="hour-{index}-{hour}">{hour}</label>
					</span>
				{/each}
				<div>minute</div>
				{#each [...placeholderArray.keys().take(60)] as minute, minuteIndex}
					<span>
						<input
							id="min-{index}-{minuteIndex}"
							type="checkbox"
							bind:group={schedule.minute}
							value={minute}
						/>
						<label class="scheduleLabels" for="min-{index}-{minute}">{minuteIndex}</label>
					</span>
				{/each}
				<button
					type="button"
					style="visibility: {job.schedules.length === 1 ? 'hidden' : ''}"
					onclick={() => job.removeSchedule(index)}
					>Remove Schedule
				</button>
			{/each}
		</div>
		<button type="button" onclick={() => job.addSchedule()}>Add Schedule</button>
	</form>
</div>

<style>
	.scheduleLabels {
		display: inline-block;
	}

	#createJobForm {
		width: 600px;
	}

	#schedules > span {
		display: inline-block;
		width: 60px;
	}
</style>
