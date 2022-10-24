import type {Config} from '@jest/types';
import {compilerOptions} from './tsconfig.json'
import {pathsToModuleNameMapper} from "ts-jest";

const config: Config.InitialOptions = {
    verbose: true,
    testPathIgnorePatterns: ['<rootDir>/.archive'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/'}),
};
export default config;