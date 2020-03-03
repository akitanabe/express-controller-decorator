import MetadataCollection from './MetadataCollection';

const TEST_KEY = Symbol('test');

type TestMetadata = {
  id: string;
  value: string;
};

describe('MetadataCollection', function() {
  const testMetadataCollection = new MetadataCollection<TestMetadata>(TEST_KEY);
  const target = {};

  beforeEach(function() {
    Reflect.deleteMetadata(TEST_KEY, target);
  });

  it('set,get', function() {
    const testdata = { id: 'set', value: 'value1' };
    testMetadataCollection.set([testdata], target);

    expect(testMetadataCollection.get(target)).toEqual([testdata]);
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

    testMetadataCollection.get(target).forEach((testdata, index) => {
      expect(testdata).toBe(testdataSet[index]);
    });
  });

  it('clear', function() {
    const testdata = { id: 'clear', value: 'clear' };
    testMetadataCollection.add(testdata, target);

    testMetadataCollection.clear(target);

    expect(testMetadataCollection.get(target).length).toBe(0);
  });
});
