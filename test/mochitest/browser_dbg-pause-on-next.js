/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

// Tests that when  pause on next is selected, we  pause on the next execution

add_task(async function() {
  const dbg = await initDebugger("doc-scripts.html");
  const {
    selectors: { getIsWaitingOnBreak, getCurrentThread }
  } = dbg;

  clickElement(dbg, "pause");
  await waitForState(dbg, state => getIsWaitingOnBreak(state, getCurrentThread(state)));
  invokeInTab("simple");

  await waitForPaused(dbg, "simple3");
  assertPaused(dbg);
});
