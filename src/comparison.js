import _ from 'lodash';

const isObject = (obj) => _.isObject(obj) && !_.isArray(obj);

const getAdded = (key, value) => ({
  key,
  value,
  type: 'added',
});

const getDeleted = (key, value) => ({
  key,
  value,
  type: 'deleted',
});

const getChanged = (key, valueBefore, valueAfter) => ({
  key,
  valueBefore,
  valueAfter,
  type: 'changed',
});

const getNested = (key, children) => ({
  key,
  type: 'nested',
  children,
});

const getUnchanged = (key, value) => ({
  key,
  value,
  type: 'unchanged',
});

const comparison = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const results = [];

  sortedKeys.forEach((key) => {
    if (!_.has(obj1, key)) {
      results.push(getAdded(key, obj2[key]));
    } else if (!_.has(obj2, key)) {
      results.push(getDeleted(key, obj1[key]));
    } else if (isObject(obj1[key]) && isObject(obj2[key])) {
      results.push(getNested(key, comparison(obj1[key], obj2[key])));
    } else if (obj1[key] !== obj2[key]) {
      results.push(getChanged(key, obj1[key], obj2[key]));
    } else {
      results.push(getUnchanged(key, obj1[key]));
    }
  });

  return results;
};

export default comparison;
