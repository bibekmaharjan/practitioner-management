import sinon from 'sinon';
import localStorageUtil from '../../utils/localStorageUtil';

describe('localStorageUtil', () => {
  let getItemStub: sinon.SinonStub<[string], string | null>;
  let setItemStub: sinon.SinonStub<[string, string], void>;
  let removeItemStub: sinon.SinonStub<[string], void>;

  beforeEach(() => {
    getItemStub = sinon.stub(localStorageUtil, 'getItem');
    setItemStub = sinon.stub(localStorageUtil, 'setItem');
    removeItemStub = sinon.stub(localStorageUtil, 'removeItem');
  });

  afterEach(() => {
    getItemStub.restore();
    setItemStub.restore();
    removeItemStub.restore();
  });

  it('should get an item from localStorage', () => {
    const key = 'example-key';
    const value = 'example-value';
    getItemStub.withArgs(key).returns(value);

    const result = localStorageUtil.getItem(key);

    expect(result).toBe(value);
    sinon.assert.calledOnce(getItemStub);
    sinon.assert.calledWithExactly(getItemStub, key);
  });

  it('should set an item in localStorage', () => {
    const key = 'example-key';
    const value = 'example-value';

    localStorageUtil.setItem(key, value);

    sinon.assert.calledOnce(setItemStub);
    sinon.assert.calledWithExactly(setItemStub, key, value);
  });

  it('should remove an item from localStorage', () => {
    const key = 'example-key';

    localStorageUtil.removeItem(key);

    sinon.assert.calledOnce(removeItemStub);
    sinon.assert.calledWithExactly(removeItemStub, key);
  });
});
