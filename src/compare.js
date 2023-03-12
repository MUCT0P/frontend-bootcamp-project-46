import _ from 'lodash';

const getObjectKeys = (obj) => _.keys(obj);

const sortKeys = (keys) => _.sortBy(keys);

const getUniqueKeys = (keys1, keys2) => _.union(keys1, keys2);

const isObject = (val) => _.isObject(val);

const getType = (obj1, obj2, key) => {
  if (!_.has(obj1, key)) {
    return 'added';
  }
  if (!_.has(obj2, key)) {
    return 'deleted';
  }
  if (isObject(obj1[key]) && isObject(obj2[key])) {
    return 'nested';
  }
  if (obj1[key] !== obj2[key]) {
    return 'changed';
  }
  return 'unchanged';
};

const compare = (obj1, obj2) => {
  const keys1 = getObjectKeys(obj1);
  const keys2 = getObjectKeys(obj2);
  const sortedKeys = sortKeys(getUniqueKeys(keys1, keys2));

  const compareValues = (key) => {
    const type = getType(obj1, obj2, key);
    switch (type) {
      case 'added':
        return { key, value: obj2[key], type };
      case 'deleted':
        return { key, value: obj1[key], type };
      case 'nested':
        return { key, type, children: compare(obj1[key], obj2[key]) };
      case 'changed':
        return {
          key, valueBefore: obj1[key], valueAfter: obj2[key], type,
        };
      default:
        return { key, value: obj1[key], type };
    }
  };

  return sortedKeys.map(compareValues);
};

export default compare;
