const TARGET_GAME_ID = "10168763039";

function blockGame(tabId) {
  chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      alert(
        "Stop playing UCDR! Go do something productive with your life. Play anything better than this. Genuinely."
      );
    }
  }).finally(() => {
    chrome.tabs.remove(tabId).catch(() => {}); // close the game because the user installed this extension to stop them from playing this pain-causing-unbalanced-fun-unfun-very-infuriating-trash :3
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "loading" &&
    tab.url?.includes(`/games/${TARGET_GAME_ID}/`)
  ) {
    blockGame(tabId);
  }
});


chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  try {
    const tab = await chrome.tabs.get(tabId);

    if (tab.url?.includes(`/games/${TARGET_GAME_ID}/`)) {
      blockGame(tabId);
    }
  } catch {
    // Tab may have already been closed
  }
});
