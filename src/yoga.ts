import type Yoga from 'yoga-wasm-web/asm';
import fs from 'fs';

const source = fs
	.readFileSync(require.resolve('yoga-wasm-web/asm'), 'utf-8')
	.replace(/export\s*\{(\w+)\s*as\s*default\}/, 'module.exports.default = $1');
const init = new Function('module', source);

const targetExports: any = {};
init({exports: targetExports});

export default targetExports.default() as any as ReturnType<typeof Yoga>;

export type {Node} from 'yoga-wasm-web';
