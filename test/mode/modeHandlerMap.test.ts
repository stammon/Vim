import * as assert from 'assert';

import { ModeHandlerMap } from '../../src/mode/modeHandlerMap';
import { EditorIdentity } from '../../src/editorIdentity';

suite.only('Mode Handler Map', () => {
  setup(() => {
    ModeHandlerMap.clear();
  });

  teardown(() => {
    ModeHandlerMap.clear();
  });

  test('getOrCreate', async () => {
    const key = EditorIdentity.createRandomEditorIdentity();
    let [modeHandler, isNew] = await ModeHandlerMap.getOrCreate(key);
    assert.strictEqual(isNew, true);
    assert.notEqual(modeHandler, undefined);

    [, isNew] = await ModeHandlerMap.getOrCreate(key);
    assert.strictEqual(isNew, false);

    // getKeys
    const keys = ModeHandlerMap.getKeys();
    assert.strictEqual(keys.length, 1, 'getKeys().length');
    assert.strictEqual(keys[0], key, 'key');

    // getAll
    const modeHandlerList = ModeHandlerMap.getAll();
    assert.strictEqual(modeHandlerList.length, 1, 'getAll() should have only returned one');

    // delete
    ModeHandlerMap.delete(key);
    assert.strictEqual(ModeHandlerMap.getAll().length, 0);
  });
});
