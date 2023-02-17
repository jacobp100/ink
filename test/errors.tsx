/* eslint-disable unicorn/string-content */
import React from 'react';
import test from 'ava';
import patchConsole from 'patch-console';
import stripAnsi from 'strip-ansi';
import {render} from '../src';
import createStdout from './helpers/create-stdout';

// @ts-expect-error
let restore;

test.before(() => {
	// @ts-expect-error
	restore = patchConsole();
});

test.after(() => {
	// @ts-expect-error
	restore();
});

test('catch and display error', t => {
	const stdout = createStdout();

	const Test = () => {
		throw new Error('Oh no');
	};

	render(<Test />, {stdout});

	t.deepEqual(
		stripAnsi(stdout.write.lastCall.args[0]).split('\n').slice(0, 14),
		[
			'',
			'  ERROR  Oh no',
			'',
			' test/errors.tsx:26:9',
			'',
			' 23:   const stdout = createStdout();',
			' 24:',
			' 25:   const Test = () => {',
			" 26:     throw new Error('Oh no');",
			' 27:   };',
			' 28:',
			' 29:   render(<Test />, {stdout});',
			'',
			' - Test (test/errors.tsx:26:9)'
		]
	);
});
