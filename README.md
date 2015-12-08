# TABle5

## Introduction

Welcome to the TABle5 repository.  TABle5 is an extension for Google Chrome that allows you to customize the browser's "New Tab" page into your own personal homepage.

All you need to use TABle5 is [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html) itself! The extension is written in Javascript, which is natively supported by the browser.

## Table of Contents

- [Introduction](#table5)
- [Installing TABle5](#installing-table5)
  - [Using git](#using-git)
  - [Manual Download](#manual-download)
- [Customizing TABle5](#customizing-table5)
  - [Background Settings](#background-settings)
  - [Game of Life](#game-of-life)
- [Using the Interface](#using-the-interface)
  - [Notes](#notes)
- [Known Issues](#known-issues)
- [License](#license)

## Installing TABle5

There are multiple ways you can install the TABle5 extension.  Choose whichever method suits your needs.  Essentially, you need to download the source and drag it into Google Chrome's extensions.  Future releases will be in Chrome's native extension package.

### Using git

With terminal or git client, use `git clone https://github.com/cjngai/TABle5.git`.

![Chrome's extension settings](https://cloud.githubusercontent.com/assets/14128808/11644447/34d4288a-9d1a-11e5-803c-e6c3b8e2c436.png)

In your Chrome window, go to **chrome://extensions/**.  Make sure "Developer Mode" is enabled, as shown in the screenshot above.

Click **Load unpacked extension**, which is highlighted in the screenshot above and navigate to the "TABle5" directory that you cloned.  Select the **src** folder inside the TABle5 directory as shown below.

![Selecting the **src** folder](https://cloud.githubusercontent.com/assets/14128808/11644669/16fa89ce-9d1c-11e5-83b4-ec9d6e7bfde1.png)

### Manual Download

You can simply download the latest release of TABle5 from the repository in archive (.ZIP) format [here](https://github.com/cjngai/TABle5/archive/master.zip).

Extract the files to a given directory, and go to the Extensions settings of Chrome by visiting **chrome://extensions/**.

Click **Load unpacked extension**, which is highlighted in the screenshot above and navigate to the "TABle5" directory that you downloaded.  Select the **src** folder inside the TABle5 directory.

## Customizing TABle5

When you open a new tab on Chrome, you will be greeted by your new homepage.  To customize certain features, click the **Settings** menu in the bottom left corner of the page.

### Background Settings

![](https://cloud.githubusercontent.com/assets/14128808/11459085/47d67714-969c-11e5-86ed-5fd002c96ee5.png)

If the default background does not fit your style, you have the option of changing it.
You may either upload your own background photo, or simply change the background to a solid color.

### Game of Life

You can toggle an implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) to run in the background.  In order to save CPU cycles, the game will pause when the tab or active window is switched.

## Using the Interface

TABle5 comes with several features that add more interaction to your New Tab page.

### Notes

![](https://cloud.githubusercontent.com/assets/14128808/11510090/d12b6ea4-982f-11e5-8733-075e37cb2ebc.png)

If you ever need to make a note of something, like a floating shopping list, TABle5 comes with a convenient note taking feature.

It gives you the option to save, edit, or delete multiple notes.  There are no restrictions on the width or length of a single note; scrollbars have been provided in case this becomes an issue.  The text area can support both ANSI and Unicode characters (in other words: it can accept more than just the Latin alphabet, so languages like Russian, Chinese, and Hindi can be saved as notes as well).  

Special characters that require HTML escaping, such as double quotes, are automatically parsed and do not require any fancy formatting from the end user.

To add a note, simply click **Add Note**.  To save your note, click **Save**.

If you would like to edit a note, hover over the note and click the (edit) button.  If you would like to delete a note, hover over the note and click the **X** button.

## Known Issues

TABle5 is still undergoing development and has not been released yet.  

## License

TABle5 is free software released under the [MIT License](https://tldrlegal.com/license/mit-license).  Basically, you can do whatever you want with TABle5 as long as you include the original copyright and license notice in any copy of the software/source.


