import * as vscode from 'vscode';

import { getAndUpdateModeHandler } from '../../extension';
import { commandLine } from '../../src/cmd_line/commandLine';
import { ModeHandler } from '../../src/mode/modeHandler';
import {
  assertEqual,
  cleanUpWorkspace,
  setupWorkspace,
  WaitForEditorsToClose,
} from './../testUtils';

suite('Vertical split', () => {
  let modeHandler: ModeHandler;

  setup(async () => {
    await setupWorkspace();
    modeHandler = await getAndUpdateModeHandler();
  });

  teardown(cleanUpWorkspace);

  for (const cmd of ['vs', 'vsp', 'vsplit', 'vnew', 'vne']) {
    test(`:${cmd} creates a second split`, async () => {
      await commandLine.Run(cmd, modeHandler.vimState);
      await WaitForEditorsToClose(2);

      assert.strictEqual(vscode.window.visibleTextEditors.length, 2, 'Editor did not split in 1 sec');
    });
  }
});
