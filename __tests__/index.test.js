import fs from 'fs';
import path from 'path';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const fileExt = [
  ['file1.json', 'file2.json', 'stylish', 'result_stylish.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'result_stylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'result_plain.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'result_plain.txt'],
  ['file1.json', 'file2.json', 'json', 'result_json.txt'],
  ['file1.yml', 'file2.yml', 'json', 'result_json.txt'],
];

const getPath = (fileName) => path.resolve(process.cwd(), `./__fixtures__/${fileName}`);
const readFile = (fileName) => fs.readFileSync(getPath(fileName), 'utf-8');

test.each(fileExt)('testing different file options', (file1, file2, format, expected) => {
  expect(genDiff(getPath(file1), getPath(file2), format)).toEqual(readFile(expected));
});
