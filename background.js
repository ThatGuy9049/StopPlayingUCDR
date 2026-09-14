const TARGET_GAME_ID = "10168763039";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Wait until the page finishes loading URL state
  if (changeInfo.status === 'loading' && tab.url && tab.url.includes(`/games/${TARGET_GAME_ID}/`)) { 
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        alert("Stop playing UCDR! Go do something productive with your life. Play anything better than this. Genuinely.");
      }
    }).then(() => {
      chrome.tabs.remove(tabId); // close the game because the user installed this extension to stop them from playing this pain-causing-unbalanced-fun-unfun-very-infuriating-trash :3
    }).catch(() => {
      // Fallback close if script fails
      chrome.tabs.remove(tabId);
    });
  }
});