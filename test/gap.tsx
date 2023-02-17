import React from 'react';
import test from 'ava';
import {renderToString} from './helpers/render-to-string';
import {Box, Text} from '../src';

test('gap', t => {
	const output = renderToString(
		<Box flexDirection="row" flexWrap="wrap" width={4} gap={2}>
			<Text>A</Text>
			<Text>B</Text>
			<Text>C</Text>
			<Text>D</Text>
		</Box>
	);

	t.is(output, 'A  B\n\n\nC  D');
});
