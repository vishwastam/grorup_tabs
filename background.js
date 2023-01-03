// background.js

const domainMap = new Map();

chrome.browserAction.onClicked.addListener(async function(tab) {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(tab => {
      const domain = extractDomain(tab.url);
      if (!domainMap.has(domain)) {
        domainMap.set(domain, []);
      }
      domainMap.get(domain).push(tab.id);
    });

    domainMap.forEach((tabIds, domain) => {
      chrome.tabGroups.create({
        title: domain,
        tabIds: tabIds
      });
    });
  });
});

function extractDomain(url) {
  let domain = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  domain = domain.split("/")[0];
  return domain;
}
