
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import myPackage from './package.json';

const initialComment = `/* ${myPackage.title} v${myPackage.version} | ${myPackage.author.name} (@${myPackage.customData.repository.accountName}) | ${myPackage.homepage} | ${myPackage.customData.repository.homepage} | ${myPackage.license} license */`;

const libraryFileName = myPackage.customData.libraryFileName;
const libraryNamespace = myPackage.customData.libraryNamespace;

const

optionsESM = {
    input: 'src/index.js',
    output: [

        // ES MODULE
        {
            file: `dist/${libraryFileName}-esm.js`,
            format: 'es',
            plugins: [
                terser({
                    mangle: false,
                    sourcemap: false,
                    output: {
                        beautify: true,
                        preamble: initialComment
                    }
                })
            ]
        },

        // ES MODULE MINIFIED
        {
            file: `dist/${libraryFileName}-esm.min.js`,
            format: 'es',
            plugins: [
                terser({
                    output: {
                        beautify: false,
                        preamble: initialComment
                    }
                })
            ],
            sourcemap: true
        }

    ]
},

optionsSYS = {
    input: 'src/index.js',
    output: [

        // SYSTEMJS TRANSPILED SCRIPT
        {
            file: `dist/${libraryFileName}-systemjs.js`,
            format: 'system',
            name: libraryNamespace,
            plugins: [
                terser({
                    mangle: false,
                    sourcemap: false,
                    output: {
                        beautify: true,
                        preamble: initialComment
                    }
                })
            ]
        },

        // SYSTEMJS TRANSPILED SCRIPT MINIFIED
        {
            file: `dist/${libraryFileName}-systemjs.min.js`,
            format: 'system',
            name: libraryNamespace,
            plugins: [
                terser({
                    output: {
                        beautify: false,
                        preamble: initialComment
                    }
                })
            ],
            sourcemap: true
        }

    ],
    plugins: [ resolve(), babel() ]
},

optionsIIFE = {
    input: 'src/index.js',
    output: [

        // IIFE TRANSPILED SCRIPT
        {
            file: `dist/${libraryFileName}.js`,
            format: 'iife',
            name: libraryNamespace,
            plugins: [
                terser({
                    mangle: false,
                    sourcemap: false,
                    output: {
                        beautify: true,
                        preamble: initialComment
                    }
                })
            ]
        },

        // IIFE TRANSPILED SCRIPT MINIFIED
        {
            file: `dist/${libraryFileName}.min.js`,
            format: 'iife',
            name: libraryNamespace,
            plugins: [
                terser({
                    output: {
                        beautify: false,
                        preamble: initialComment
                    }
                })
            ],
            sourcemap: true
        }

    ],
    plugins: [ resolve(), babel() ]
}

;

export default [ optionsESM, optionsSYS, optionsIIFE ]