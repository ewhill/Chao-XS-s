// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
* Get the current URL.
*
* @param {function(string)} callback called when the URL of the current tab
*   is found.
*/
function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active: true,
        currentWindow: true
    };
    
    chrome.tabs.query(queryInfo, (tabs) => {
        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        var tab = tabs[0];
        
        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tab.url;
        
        // tab.url is only available if the "activeTab" permission is declared.
        // If you want to see the URL of other tabs (e.g. after removing active:true
        // from |queryInfo|), then the "tabs" permission is required to see their
        // "url" properties.
        console.assert(typeof url == 'string', 'tab.url should be a string');
        
        callback(url);
    });
    
    // Most methods of the Chrome extension APIs are asynchronous. This means that
    // you CANNOT do something like this:
    //
    // var url;
    // chrome.tabs.query(queryInfo, (tabs) => {
    //   url = tabs[0].url;
    // });
    // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
* Change the background color of the current page.
*
* @param {string} color The new background color.
*/
function changeBackgroundColor(color) {
    var script = 'document.body.style.backgroundColor="' + color + '";';
    // See https://developer.chrome.com/extensions/tabs#method-executeScript.
    // chrome.tabs.executeScript allows us to programmatically inject JavaScript
    // into a page. Since we omit the optional first argument "tabId", the script
    // is inserted into the active tab of the current window, which serves as the
    // default.
    chrome.tabs.executeScript({
        code: script
    });
}

/**
* Gets the saved background color for url.
*
* @param {string} url URL whose background color is to be retrieved.
* @param {function(string)} callback called with the saved background color for
*     the given url on success, or a falsy value if no color is retrieved.
*/
function getSavedPayload(callback) {
    // See https://developer.chrome.com/apps/storage#type-StorageArea. We check
    // for chrome.runtime.lastError to ensure correctness even when the API call
    // fails.
    chrome.storage.sync.get("payload", (items) => {
        callback(chrome.runtime.lastError ? null : items["payload"]);
    });
}

/**
* Sets the given background color for url.
*
* @param {string} url URL for which background color is to be saved.
* @param {string} color The background color to be saved.
*/
function savePayload(payload, callback) {
    // See https://developer.chrome.com/apps/storage#type-StorageArea. We omit the
    // optional callback since we don't need to perform any action once the
    // payload is saved.
    chrome.storage.sync.set({'payload': payload});
    callback(chrome.runtime.lastError ? false : true);
}

// This extension loads the saved background color for the current tab if one
// exists. The user can select a new background color from the dropdown for the
// current page, and it will be saved as part of the extension's isolated
// storage. The chrome.storage API is used for this purpose. This is different
// from the window.localStorage API, which is synchronous and stores data bound
// to a document's origin. Also, using chrome.storage.sync instead of
// chrome.storage.local allows the extension data to be synced across multiple
// user devices.
document.addEventListener('DOMContentLoaded', () => {
    // This code is fired when the user click the extension icon and it's 
    // content is loaded
    var display = $("#payloadDisplay");
    var displayValue = $("#payloadDisplayValue");
    var input = $("#payloadInput");
    var submit = $("#payloadSubmit");
    var form = $("#payloadForm");
    var findingsList = $("#findingsList");
    var payload = null;
    
    getSavedPayload((savedPayload) => {
        displayValue.innerText = savedPayload ? savedPayload : "(UNDEFINED, CLICK TO SET)";
        input.value = (savedPayload ? savedPayload : "");
        payload = savedPayload;
    });
    
    display.addEventListener("click", () => {
        display.style.display = "none";
        form.style.display = "block";
        input.focus();
        input.setSelectionRange(0, input.value.length);
    });
    
    input.addEventListener("keypress", (e) => {
        if(e.charCode == 13) submit.click();
    });
    
    submit.addEventListener("click", () => {
        if(!input.value || input.value.trim().length < 1)
            return;
        
        savePayload(input.value, (result) => {
            if(result) {
                displayValue.innerText = input.value;
                display.style.display = "block";
                form.style.display = "none";
            } else {
                alert("ERROR: Something went wrong when saving the payload.\n"+
                    "Please try again later.");
            }
        });
    });
    
    
    getCurrentTabUrl((url) => {
        chrome.tabs.executeScript({
            file: "js/injectScript.js",
            //allFrames: true,
            runAt: "document_end"
        });
        
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if(!payload || payload.length === 0) {
                alert("Please set a payload before running a scan. Click on 'Payload' to set your payload.");
                return;
            }
            
            chrome.tabs.sendMessage(tabs[0].id, {'payload': payload}, function(response) {
                console.log(response.status);
            });
            document.getElementById("loading").style.display = "block";
        });
        
        
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            console.log(request);
            
            if(typeof request.location == "string" && request.location.length && 
                typeof request.selector == "string" && request.selector.length) {
                    var f = document.createElement("tr");
                    f.style["font-weight"] = "bold";
                    
                    var ft1 = document.createElement("td");
                    var ft2 = document.createElement("td");
                    ft1.setAttribute("valign", "center");
                    ft2.setAttribute("valign", "center");
                    ft2.setAttribute("align", "right");
                    
                    var fa = document.createElement("a");
                    fa.setAttribute("target", "_blank");
                    fa.href = request.location;
                    fa.innerText = request.location;
                    ft1.appendChild(fa);
                    
                    var fs = document.createElement("span");
                    fs.style.float = "right";
                    fs.style["font-weight"] = "normal";
                    fs.innerText = request.selector;
                    ft2.appendChild(fs);
                    
                    f.appendChild(ft1);
                    f.appendChild(ft2);
                    findingsList.appendChild(f);
                    sendResponse({status: "ok"});
            } else if(typeof request.done == "string" && request.done.length) {
                document.getElementById("loading").style.display = "none";
            } else if(typeof request.waiting == "boolean" && request.waiting) {
                document.getElementById("loading").style.display = "none";
                document.getElementById("warning").style.display = "block";
                document.getElementById("warning").innerText = "chaoXSs scan timed out. "+
                        "Some iFrames may still load, but some seem to be "+
                        "taking a while to do so... For further information, "+
                        "check the Developer Tools 'Network' tab.";
            }
        });
    });
    
    /*
    getCurrentTabUrl((url) => {
        chrome.tabs.executeScript({
            code: ""
        });
    });
    */
});
