import {spawn} from 'node-pty';

type Run = (
	fixture: string,
	props?: {env?: Record<string, unknown>; columns?: number}
) => Promise<string>;

export const run: Run = (fixture, props) => {
	const env: any = {
		...process.env,
		...props?.env
	};

	return new Promise<string>((resolve, reject) => {
		const term = spawn(
			'ts-node',
			['--transpileOnly', `${__dirname}/../fixtures/${fixture}.tsx`],
			{
				name: 'xterm-color',
				cols: typeof props?.columns === 'number' ? props.columns : 100,
				cwd: __dirname,
				env
			}
		);

		let output = '';

		term.on('data', data => {
			output += data;
		});

		term.on('exit', code => {
			if (code === 0) {
				resolve(output);
				return;
			}

			reject(new Error(`Process exited with a non-zero code: ${output}`));
		});
	});
};
