import EventEmitter from 'events';
import {spy} from 'sinon';

// Fake process.stdout
interface Stream extends EventEmitter {
	output: string;
	columns: number;
	write: ((str: string) => void) & {
		lastCall: {
			args: string[];
		};
	};
	get(): string;
}

export default (columns?: number): any /* TODO: Fix type */ => {
	const stdout = new EventEmitter() as Stream;
	stdout.columns = columns ?? 100;
	stdout.write = spy();
	stdout.get = () => stdout.write.lastCall.args[0];

	return stdout;
};
