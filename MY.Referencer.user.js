// ==UserScript==
// @name          Mi Yodeya Referencer
// @description   Links Biblical and Talmudic references to Chabad.org's online Tanach. (Formerly "SE Tanach Referencer")
// @match         http://stackoverflow.com/*
// @match         http://meta.stackoverflow.com/*
// @match         http://superuser.com/*
// @match         http://meta.superuser.com/*
// @match         http://serverfault.com/*
// @match         http://meta.serverfault.com/*
// @match         http://askubuntu.com/*
// @match         http://meta.askubuntu.com/*
// @match         http://answers.onstartups.com/*
// @match         http://meta.answers.onstartups.com/*
// @match         http://stackapps.com/*
// @match         http://*.stackexchange.com/*
// @exclude       http://chat.stackexchange.com/*
// @exclude       http://chat.*.stackexchange.com/*
// @exclude       http://api.*.stackexchange.com/*
// @exclude       http://data.stackexchange.com/*
// @exclude       http://*/reputation
// @author        @HodofHod   
// @version       1.9
// ==/UserScript==


/* 
Credits:        
@TimStone for the inject() function and some stray bits
@Menachem for the Chabad.org and Mechon Mamre links, and for all the debugging help
Joel Nothman and bibref.hebtools.com's spellings, which I pruned and modded.

ABANDON ALL HOPE, YE WHO LIKE WELL-WRITTEN CODE. y'know. with standards 'n stuff. (
Are there even standards for JavaScript? Oh well.)
*/
var hodReferencer |= {};

hodReferencer.referencer |= (function ($, window, document) {
    
    var registrations = [],
        prefixes = [],
    
    inject = (function (document) {
        'use strict';
        return function () {//Inject the script into the document
            var i, script;
            for (i = 1; i < arguments.length; ++i) {
                if (typeof (arguments[i]) === 'function') {
                    script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.textContent = '(' + arguments[i].toString() + ')(jQuery)';
                    document.body.appendChild(script);
                }
            }
        };
    })(document),
    
    link = (function($) {
        function (linker, value, options) {
            var match = linker.regex.exec(value), 
            workName, actualName = null, displayText = null, url;
            
            if(!match) {
                return null;
            }
            workName = match[linker.captureIndexOfName].toLowerCase().replace(/ /g, '');
            $.each(linker.spellings, function (canonicalName, validSpellings) {
                if(workName === canonicalName.toLowerCase() || $.inArray(workName, validSpellings)) {
                    actualName = canonicalName;
                    return false; // escape the each loop
                }
            });
            
            if(!actualName) {
                return null;
            }
            
            url = linker.link(actualName, match, options);
            
            if(url && options.contains("l")) {
                // l always means add link with text
                displayText = linker.name(actualName, match, options);
                return "[" + displayText + "](" + url +")";
            }
            
            return url;
        }
    })($);
    
    String.prototype.escapeRegExp = function() {
        return this.replace(/(?=[\\^$*+?.()|{}[\]])/g, "\\");
    };
	
    // linker is an object with the following properties:
    // { 
    //    link : function(actualName, matchGroup, options), returns a URL
    //    regex : the regex to match after the prefix
    //    captureIndexOfName : which match capture is the name (or abbreviated name) of the work
    //    spellings : hashmap of canonical name to array of acceptable spellings
    //    name : function(actualName, matchGroup, options), returns displayable text
    // }
    return {
        register : function (prefix, linker) {
            registrations[prefix.escapeRegExp()] = linker;
            prefixes.push(prefix.escapeRegExp());
        },
        refhijack : function ($textarea) {
            var textarea = $textarea.addClass('ref-hijacked')[0], //add an extra class. Why? No idea. 
                form     = $textarea.closest('form');             //Ask @TimStone, it's his fault
            
            form.focusout(function () { //when you click away, I pounce!
                var i, prefixRegex, regex, match, replacementText, newValue;
                regex = new RegExp("(\\(|\\s|^))\\[(" + prefixes.join("|") + ")[;,. :-]" +
                               "(.+?)" + 
                               "(?:[;., :-]([a-z]{0,4}))?\\]($|[\\s,.;:\\)]", "mig");
                newValue = textarea.value;
                while (true) {
                    match = regex.exec(textarea.value);
                    if(!match) {
                        break;
                    }
                    // get the replacement
                    replacementText = link(registrations[match[2]], match[3], match[4]);
                    if (replacementText) {
                        newValue = newValue.replace(match[0], match[1] + replacementText + match[5]);
                    }
                }
                
                // manipulate DOM once.
                textarea.value = newValue;
                
                StackExchange.MarkdownEditor.refreshAllPreviews(); //refresh the Q's & A's preview panes
            });
        }
        
    };
}(jQuery, this, document);


	$(document).onReady(function() {
		hodReferencer.referencer.register("t", hodReferencer.ref.tanakh);
		hodReferencer.referencer.register("g", hodReferencer.ref.gemara);
		$('textarea[name="comment"]:not(.ref-hijacked)').live('focus', function () {
			hodReferencer.referencer.refhijack($(this));//Alright, everybody keep calm! I'm hijackin' this 'ere comment box!
		});
		$('textarea[name="post-text"]:not(.ref-hijacked)').live('focus', function () {
			hodReferencer.referencer.refhijack($(this));//And while I'm at it, I'll them questions and answers too!
		});
	});