// injectScript.js

/*
CSS Selector Generator, v1.0.4
by Riki Fridrich <riki@fczbkk.com> (http://fczbkk.com)
https://github.com/fczbkk/css-selector-generator/
*/(function(){var a,b,c=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};a=function(){function a(a){null==a&&(a={}),this.options={},this.setOptions(this.default_options),this.setOptions(a)}return a.prototype.default_options={selectors:["id","class","tag","nthchild"]},a.prototype.setOptions=function(a){var b,c,d;null==a&&(a={}),c=[];for(b in a)d=a[b],this.default_options.hasOwnProperty(b)?c.push(this.options[b]=d):c.push(void 0);return c},a.prototype.isElement=function(a){return!(1!==(null!=a?a.nodeType:void 0))},a.prototype.getParents=function(a){var b,c;if(c=[],this.isElement(a))for(b=a;this.isElement(b);)c.push(b),b=b.parentNode;return c},a.prototype.getTagSelector=function(a){return this.sanitizeItem(a.tagName.toLowerCase())},a.prototype.sanitizeItem=function(a){var b;return b=a.split("").map(function(a){return":"===a?"\\"+":".charCodeAt(0).toString(16).toUpperCase()+" ":/[ !"#$%&'()*+,.\/;<=>?@\[\\\]^`{|}~]/.test(a)?"\\"+a:escape(a).replace(/\%/g,"\\")}),b.join("")},a.prototype.getIdSelector=function(a){var b,c;return b=a.getAttribute("id"),null==b||""===b||/\s/.exec(b)||/^\d/.exec(b)||(c="#"+this.sanitizeItem(b),1!==a.ownerDocument.querySelectorAll(c).length)?null:c},a.prototype.getClassSelectors=function(a){var b,c,d;return d=[],b=a.getAttribute("class"),null!=b&&(b=b.replace(/\s+/g," "),b=b.replace(/^\s|\s$/g,""),""!==b&&(d=function(){var a,d,e,f;for(e=b.split(/\s+/),f=[],a=0,d=e.length;d>a;a++)c=e[a],f.push("."+this.sanitizeItem(c));return f}.call(this))),d},a.prototype.getAttributeSelectors=function(a){var b,d,e,f,g,h,i;for(i=[],d=["id","class"],g=a.attributes,e=0,f=g.length;f>e;e++)b=g[e],h=b.nodeName,c.call(d,h)<0&&i.push("["+b.nodeName+"="+b.nodeValue+"]");return i},a.prototype.getNthChildSelector=function(a){var b,c,d,e,f,g;if(e=a.parentNode,null!=e)for(b=0,g=e.childNodes,c=0,d=g.length;d>c;c++)if(f=g[c],this.isElement(f)&&(b++,f===a))return":nth-child("+b+")";return null},a.prototype.testSelector=function(a,b){var c,d;return c=!1,null!=b&&""!==b&&(d=a.ownerDocument.querySelectorAll(b),1===d.length&&d[0]===a&&(c=!0)),c},a.prototype.getAllSelectors=function(a){var b;return b={t:null,i:null,c:null,a:null,n:null},c.call(this.options.selectors,"tag")>=0&&(b.t=this.getTagSelector(a)),c.call(this.options.selectors,"id")>=0&&(b.i=this.getIdSelector(a)),c.call(this.options.selectors,"class")>=0&&(b.c=this.getClassSelectors(a)),c.call(this.options.selectors,"attribute")>=0&&(b.a=this.getAttributeSelectors(a)),c.call(this.options.selectors,"nthchild")>=0&&(b.n=this.getNthChildSelector(a)),b},a.prototype.testUniqueness=function(a,b){var c,d;return d=a.parentNode,c=d.querySelectorAll(b),1===c.length&&c[0]===a},a.prototype.testCombinations=function(a,b,c){var d,e,f,g,h,i,j;for(i=this.getCombinations(b),e=0,g=i.length;g>e;e++)if(d=i[e],this.testUniqueness(a,d))return d;if(null!=c)for(j=b.map(function(a){return c+a}),f=0,h=j.length;h>f;f++)if(d=j[f],this.testUniqueness(a,d))return d;return null},a.prototype.getUniqueSelector=function(a){var b,c,d,e,f,g;for(g=this.getAllSelectors(a),e=this.options.selectors,c=0,d=e.length;d>c;c++)switch(f=e[c]){case"id":if(null!=g.i)return g.i;break;case"tag":if(null!=g.t&&this.testUniqueness(a,g.t))return g.t;break;case"class":if(null!=g.c&&0!==g.c.length&&(b=this.testCombinations(a,g.c,g.t)))return b;break;case"attribute":if(null!=g.a&&0!==g.a.length&&(b=this.testCombinations(a,g.a,g.t)))return b;break;case"nthchild":if(null!=g.n)return g.n}return"*"},a.prototype.getSelector=function(a){var b,c,d,e,f,g,h,i,j,k;for(b=[],h=this.getParents(a),d=0,f=h.length;f>d;d++)c=h[d],j=this.getUniqueSelector(c),null!=j&&b.push(j);for(k=[],e=0,g=b.length;g>e;e++)if(c=b[e],k.unshift(c),i=k.join(" > "),this.testSelector(a,i))return i;return null},a.prototype.getCombinations=function(a){var b,c,d,e,f,g,h;for(null==a&&(a=[]),h=[[]],b=d=0,f=a.length-1;f>=0?f>=d:d>=f;b=f>=0?++d:--d)for(c=e=0,g=h.length-1;g>=0?g>=e:e>=g;c=g>=0?++e:--e)h.push(h[c].concat(a[b]));return h.shift(),h=h.sort(function(a,b){return a.length-b.length}),h=h.map(function(a){return a.join("")})},a}(),("undefined"!=typeof define&&null!==define?define.amd:void 0)?define([],function(){return a}):(b="undefined"!=typeof exports&&null!==exports?exports:this,b.CssSelectorGenerator=a)}).call(this);

var frameCount = 0;
function copyDocumentIntoIframe() {
    var newFrame = document.createElement("iframe");
    newFrame.setAttribute("src", document.location.href);
    newFrame.setAttribute("id", ("frm"+(++frameCount)));
    newFrame.style.position = "fixed";
    newFrame.style.left = "-10px;";
    newFrame.style.top = "-10px";
    newFrame.style.width = "1px";
    newFrame.style.height = "1px";
    newFrame.style.opacity = "0.0";
    newFrame.style.filter = "opacity(0)";
    document.body.appendChild(newFrame); 
    return newFrame;
}

function newIframeWithContent(content) {
    // Creates the new iframe, add the iframe where you want
    var newFrame = document.createElement("iframe");
    newFrame.setAttribute("id", ("frm"+(++frameCount)));
    newFrame.style.position = "fixed";
    newFrame.style.left = "-10px;";
    newFrame.style.top = "-10px";
    newFrame.style.width = "1px";
    newFrame.style.height = "1px";
    newFrame.style.opacity = "0.0";
    newFrame.style.filter = "opacity(0)";
    document.body.appendChild(newFrame); 
    
    // We need the iframe document object, different browsers different ways
    var frameDocument = newFrame.document;
    
    if (newFrame.contentDocument)
        frameDocument = newFrame.contentDocument;
    else if (newFrame.contentWindow)
        frameDocument = newFrame.contentWindow.document;
    
    // We open the document of the empty frame and we write desired content.
    // originalHtmlContent is a string where you have the source iframe HTML content.
    frameDocument.open();
    frameDocument.writeln(content);
    frameDocument.close();
    
    return newFrame;
}

var sLib = new CssSelectorGenerator;
var payload = "";
var loadedCount = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
      
    if(typeof request.payload == "string" && request.payload.length) {
        payload = request.payload;
        sendResponse({status: "ok"});
        runChaoXSs(request.payload);
    }
});

function waitForFinish(n) {
    var times = 0;
    var maxTime = n*3; //dynamic timeout, n (number of items) * 1s
    var checkFinish = function() {
        if(loadedCount >= n) {
            chrome.runtime.sendMessage({
                'done': "ok"
            }, function(response) {
                // console.warn("Finished chaoXSs scan.");
            });
            return;
        } else {
            if(times >= maxTime) {
                chrome.runtime.sendMessage({
                    'waiting': true,
                    'total': n,
                    'todo': (n-loadedCount),
                    'done': loadedCount
                }, function(response) {
                    console.warn("chaoXSs scan reached timeout. "+
                        "Items may still load, but there  are unfinished "+
                        "iframes that are taking a while to load...\n"+
                        "For further information, check the Developer Tools "+
                        "'Network' tab");
                });
                return;
            }
        }
        times++;
        setTimeout(checkFinish, 1000);
    }
    checkFinish();
}

function succeXSS(location, selector, iframe) {
    console.log("Potential XSS found:");
    console.log("\t",{
        'location': location,
        'selector': selector,
        'Element': document.querySelectorAll(selector)
    });
    
    chrome.runtime.sendMessage({
        'location': location,
        'selector': selector
    }, function(response) {
        // console.log("Response from Extension:", response);
    });
}

function setIframeValues(iframe, selectors) {
    // go through selectors and change values of inputs
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    for(var selector in selectors) {
        var elem = innerDoc.querySelector(selector);
        if(elem) {
            elem.value = payload;
            if(elem.setAttribute && typeof elem.setAttribute == "function") {
                elem.setAttribute("value", payload);
            }                
        }
    }
}

function submitForm(elem) {
    if(typeof elem.submit == "function") {
        elem.submit();
    } else if(elem.submit.click && typeof elem.submit.click == "function") {
        elem.submit.click();
    } else {
        console.error("No idea how to submit form:", elem);
    }
}

function clickOn(elem) {
    if(typeof elem.click == "function") {
        elem.click();
    } else {
        console.error("No idea how to click on element:", elem);
    }
}

// Experimental: some (most) browsers doen't allow simulated keypresses
// from JavaScript... But, it's worth a try.
function simulateKeyPress(elem, innerDoc, key) {
    var keyboardEvent = innerDoc.createEvent("KeyboardEvent");
    var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 
        "initKeyboardEvent" : "initKeyEvent";
    
    keyboardEvent[initMethod]("keypress",true,true,null,false,false,false,false,key,0);
    elem.dispatchEvent(keyboardEvent);
}

function setValueToPayload(elem) {
    elem.value = payload;
    elem.setAttribute("value", payload);
} 

function interact(elem, innerWin, innerDoc) {
    if(!elem) {
        console.error("Element was null or otherwise not set");
        return;
    }
    
    var elemType = elem.nodeName.toLowerCase();
    
    switch(elemType) {
        case "form":
            submitForm(elem);
            break;
        case "button":
            clickOn(elem);
            break;
        case "input":
            setValueToPayload(elem);
            var inputType = elem.getAttribute("type").toLowerCase();
            
            /*"button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week" */
            
            if(inputType == "button" || inputType == "submit") {
                clickOn(elem);
            } else if(inputType == "text" || inputType == "date" || inputType == "datetime-local" ||
                inputType == "email" || inputType == "month" || inputType == "number" || 
                inputType == "password" || inputType == "range" || inputType == "reset" || 
                inputType == "search" || inputType == "tel" || inputType == "time" || inputType == "url" ||
                inputType == "week") {
                    simulateKeyPress(elem, innerDoc, 13);
                    simulateKeyPress(elem, innerDoc, 10);
            }
                
            break;
        case "textarea":
            elem.innerHTML = payload;
            elem.innerText = payload;
            break;
        case "a":
            clickOn(elem);
            break;
        default:
            clickOn(elem);
            break;
    }
}

function chaoXSs(htmlElems, selectors) {
    var copyAndSubmit = function(elem) {
        // create iframes for each simulated interaction...
        var iframe = copyDocumentIntoIframe();
        var iframeId = iframe.getAttribute("id");
        iframe = document.getElementById(iframeId);
        
        var elemSelector = null;
        var times = 0;
        
        iframe.onload = function() {
            var innerWin = (iframe.contentWindow || iframe);
            var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            // console.log("iframe.onload()"); //this fires after "load" event (above)
            
            iframe.onload = function() {
                innerWin = (iframe.contentWindow || iframe);
                innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                
                loadedCount++;
                
                var outer = innerDoc.documentElement.outerHTML.slice(0);
                var location = innerWin.location.href;
                var loc = outer.indexOf(payload);
                if(loc < 0) loc = outer.indexOf(payload.replace(/\'/ig, '"'));
                
                if(loc > -1) {
                    var tempLocation = JSON.stringify((iframe.contentWindow || iframe).location);
                    
                    iframe.parentNode.removeChild(iframe);
                    iframe = newIframeWithContent('<script>console.log("Custom watch script injected.");' +
                        'var ___props={},___delay=1000,___callback=function(_,r,n){console.warn("window["+_+"] changed from ",r," to ",n,"!")},___stringy=function(_){var r=[];return JSON.stringify(_,function(_,n){if("object"==typeof n&&null!==n){if(-1!==r.indexOf(n))return;r.push(n)}return n})},___addToWatchList=function(_,r){if("string"==typeof _){if(0===_.indexOf("___"))return!1;if("self"==_)return!1;if("frames"==_)return!1;if("window"==_)return!1;if("parent"==_)return!1;if("top"==_)return!1;if("chrome"==_)return!1}if("function"==typeof r)return!1;try{return ___props[_]=___stringy(r),!0}catch(_){return console.error(_.message),!1}};for(var ___i in window)___addToWatchList(___i.toString(),window[___i]);var ___doWatch=function(){for(var _ in window)if(___props.hasOwnProperty(_)){if(___props[_]!==___stringy(window[_])){var r=JSON.parse(___props[_]);___callback(_,r,window[_]),___props[_]=___stringy(window[_])}}else ___addToWatchList(_,window[_])&&___callback(_,null,window[_])};___doWatch();var ___t=setInterval(___doWatch,___delay)</script>' + outer);
                    (iframe.contentWindow || iframe).history.pushState('', (iframe.contentDocument || iframe.contentWindow.document).title, location);
                    
                    var iframeLoadStart = function() {
                        console.log("iframeLoadStart ('load') event fired " +
                            "from location.reload() triggered.");
                    };
                    
                    var iframeLoadEnd = function() { // all content is finished loading...
                        setTimeout(function() {
                            iframe.parentNode.removeChild(iframe);
                            succeXSS(location, elemSelector);
                        }, 10000);
                    };
                    
                    iframe.addEventListener("load", iframeLoadStart, true);
                    iframe.onload = iframeLoadEnd; //iframe is finished loading...
                } else {
                    iframe.parentNode.removeChild(iframe);
                }
            };
            
            //override all values for inputs, forms, etc.
            setIframeValues(iframe, selectors);
            
            // Get the form's css selector to submit the form...
            elemSelector = sLib.getSelector(elem);
            elem = innerDoc.querySelector(elemSelector);
            
            if(Array.isArray(elem) || elem instanceof HTMLCollection)
                elem = elem[0];
            
            if(elem) {
                interact(elem, innerWin, innerDoc);
            }
            times++;
        };
    };
    
    if(Array.isArray(htmlElems) || htmlElems instanceof HTMLCollection) {
        for(var i=0; i<htmlElems.length; i++) {
            copyAndSubmit(htmlElems[i]);
        }
    } else {
        copyAndSubmit(htmlElems);
    }
}

function runChaoXSs(payload) {
    console.warn("Starting Chao(XS)s Scan");
    
    //text | password | checkbox | radio | submit | reset | file | hidden | image | button
    var documentInputs = document.getElementsByTagName("input");
    var documentForms = document.getElementsByTagName("form");
    var documentButtons = document.getElementsByTagName("button");
    var allSelectors = {};
    var allElements = [];
    
    if(documentInputs && documentInputs.length > 0) {
        allElements = Array.prototype.concat.apply(allElements, documentInputs);
    }
    
    if(documentForms && documentForms.length > 0) {
        allElements = Array.prototype.concat.apply(allElements, documentForms);
    }
    
    if(documentButtons && documentButtons.length > 0) {
        allElements = Array.prototype.concat.apply(allElements, documentButtons);
    }
    
    for(var i=0; i<allElements.length; i++) {
        var selector = sLib.getSelector(allElements[i]);
        allSelectors[selector] = (typeof allSelectors[selector] == 'number' ? allSelectors[selector]+1 : 1);
    }
    
    // console.log(allElements, allSelectors);
    chaoXSs(allElements, allSelectors)
    
    waitForFinish(allElements.length);
}

console.warn("~~ Chao(XS)s Started ~~");


