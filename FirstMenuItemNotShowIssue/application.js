//# sourceURL=application.js

/*
 application.js
 FirstMenuItemNotShowIssue
 
 Copyright (c) 2017年 zfu. All rights reserved.
*/

/*
 * This file provides an example skeletal stub for the server-side implementation 
 * of a TVML application.
 *
 * A javascript file such as this should be provided at the tvBootURL that is 
 * configured in the AppDelegate of the TVML application. Note that  the various 
 * javascript functions here are referenced by name in the AppDelegate. This skeletal 
 * implementation shows the basic entry points that you will want to handle 
 * application lifecycle events.
 */

/**
 * @description The onLaunch callback is invoked after the application JavaScript 
 * has been parsed into a JavaScript context. The handler is passed an object 
 * that contains options passed in for launch. These options are defined in the
 * swift or objective-c client code. Options can be used to communicate to
 * your JavaScript code that data and as well as state information, like if the 
 * the app is being launched in the background.
 *
 * The location attribute is automatically added to the object and represents 
 * the URL that was used to retrieve the application JavaScript.
 */
App.onLaunch = function(options) {
    //var alert = createAlert("Hello World!", "Welcome to tvOS");
    //navigationDocument.pushDocument(alert);
    showHome();
}


App.onWillResignActive = function() {

}

App.onDidEnterBackground = function() {

}

App.onWillEnterForeground = function() {
    
}

App.onDidBecomeActive = function() {
    
}

App.onWillTerminate = function() {
    
}

function showHome()
{
    const stackTemplateStr = `<document>
        <stackTemplate>
            <banner>
                <title>Click PlayMusic first, then MenuBar first page can not show up</title>
            </banner>
            <collectionList>
                <shelf>
                    <section>
                    <lockup id="0">
                        <img src="empty.png" width="400" height="240" />
                        <title>MenuBar</title>
                    </lockup>
                    <lockup id="1">
                        <img src="empty.png" width="400" height="240" />
                        <title>PlayMusic</title>
                    </lockup>
                    </section>
                </shelf>
            </collectionList>
        </stackTemplate>
    </document>`;
    const parser = new DOMParser();
    const doc = parser.parseFromString(stackTemplateStr, "application/xml");
    doc.addEventListener("select", (event)=>{
        const target = event.target;
        const id = target.getAttribute("id");
        console.log(`id=${id}`);
        if (id=='0') {
            showMenuBar();
        } else if (id=='1') {
            playMusic();
        }
    });
    navigationDocument.pushDocument(doc);
}

function showMenuBar()
{
    const menuBarTemplateStr = `<document>
        <menuBarTemplate>
            <menuBar>
                <menuItem id="0">
                    <title>Page1</title>
                </menuItem>
                <menuItem id="1">
                    <title>Page2</title>
                </menuItem>
            </menuBar>
        </menuBarTemplate>
    </document>`
    const parser = new DOMParser();
    const doc = parser.parseFromString(menuBarTemplateStr, "application/xml");
    doc.addEventListener("select", (event)=>{
        const target = event.target;
        const id = target.getAttribute('id');
        const ele = target.parentNode;
        const feature = ele.getFeature("MenuBarDocument");
        const featureDoc = feature.getDocument(target);
        console.log("show page %d", id);
        if (featureDoc == null) {
            if (id=='0') {
                console.log("create page %d", id);
                const pageDoc = createAlert("page1", "it should shows");
                feature.setDocument(pageDoc, target);
            } else {
                console.log("create page %d", id);
                const pageDoc = createAlert("page2", "it also should shows");
                feature.setDocument(pageDoc, target);
            }
        }
    });
    navigationDocument.pushDocument(doc);
}

function playMusic()
{
    let mediaItem = new MediaItem("audio", "http://www.sample-videos.com/audio/mp3/india-national-anthem.mp3");
    let playList = new Playlist();
    playList.push(mediaItem);
    let player = new Player();
    player.playlist = playList;
    player.play();
}
/**
 * This convenience funnction returns an alert template, which can be used to present errors to the user.
 */
var createAlert = function(title, description) {

    var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
        <document>
          <alertTemplate>
            <title>${title}</title>
            <description>${description}</description>
          </alertTemplate>
        </document>`

    var parser = new DOMParser();

    var alertDoc = parser.parseFromString(alertString, "application/xml");

    return alertDoc
}
