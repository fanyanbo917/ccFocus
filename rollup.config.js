/*
 * @Author: Kuiper
 * @Date: 2020-12-23 19:38:47
 * @LastEditTime: 2021-03-08 16:47:17
 */
import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default {
    input: './src/index.ts',
    output: [{
        file: 'dist/index-umd.js',
        name: 'ccFocus',
        format: 'umd',
        // sourcemap: true
    },{
        file: 'dist/index-es.js',
        format: 'es'
    },{
        file: 'dist/index-cjs.js',
        format: 'cjs'
    }],
    
    plugins: [
        typescript(),
        resolve(),  
        terser()
    ]
}