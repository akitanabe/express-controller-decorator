import MetadataCollection from './MetadataCollection';

const TEST_KEY = Symbol('test');

type TestMetadata = {
  id: string;
  value: string;
};

describe('MetadataCollection', function() {
  const testMetadataCollection = new MetadataCollection<TestMetadata>(TEST_KEY);
  const target = {};
  const propKey = 'propKey';

  beforeEach(function() {
    Reflect.deleteMetadata(TEST_KEY, target);
    Reflect.deleteMetadata(TEST_KEY, target, propKey);
  });

  it('set,get', function() {
    const testdata = { id: 'set', value: 'value1' };

    testMetadataCollection.set([testdata], target);

    expect(testMetadataCollection.get(target)).toEqual([testdata]);
  });

  it('set,get prop', function() {
    const testdata = { id: 'set', value: 'prop' };
    testMetadataCollection.set([testdata], target, propKey);

    expect(testMetadataCollection.get(target, propKey)).toEqual([testdata]);
  });

  it('add', function() {
    const testdataSet = [
      { id: 'add', value: 'value1' },
      { id: 'add', value: 'value2' },
      { id: 'add', value: 'value3' },
    ];

    testdataSet.forEach((testdata) => {
      testMetadataCollection.add(testdata, target);
    });

    expect(testMetadataCollection.get(target).length).toBe(testdataSet.length);

    testMetadataCollection.get(target).forEach((testdata, index) => {
      expect(testdata).toBe(testdataSet[index]);
    });
  });

  it('add prop', function() {
    const testdataSet = [
      { id: 'add', value: 'prop1' },
      { id: 'add', value: 'prop2' },
      { id: 'add', value: 'prop3' },
    ];

    testdataSet.forEach((testdata) => {
      testMetadataCollection.add(testdata, target, propKey);
    });

    expect(testMetadataCollection.get(target, propKey).length).toBe(
      testdataSet.length
    );

    testMetadataCollection.get(target, propKey).forEach((testdata, index) => {
      expect(testdata).toBe(testdataSet[index]);
    });
  });

  it('clear', function() {
    const testdata = { id: 'clear', value: 'clear' };
    testMetadataCollection.add(testdata, target);

    testMetadataCollection.clear(target);

    expect(testMetadataCollection.get(target).length).toBe(0);
  });

  it('clear prop', function() {
    const testdata = { id: 'clear', value: 'props' };
    testMetadataCollection.add(testdata, target, propKey);

    testMetadataCollection.clear(target, propKey);

    expect(testMetadataCollection.get(target, propKey).length).toBe(0);
  });
});
