# Firefox OS TV workshop boilerplate
A template web content for Firefox OS TV workshop.  
Use this sample page to practice content optimization for Firefox OS TV.

## Initialization
Clone this repository to your workspace, and cd into it.
```sh
git clone https://github.com/elin-moco/tv-workshop-boilerplate.git
cd tv-workshop-boilerplate
```
Use [bower] to install dependencies:
```sh
bower install
```
## Optimization Steps for TV Content
1. Make sure you have high resolution assets prepared.
2. Use media query to handle higher resolution.  
Resolution for TVs range from 720P to 4K, so make sure elements looks big and sharp in different resolution.
3. Deal with key navigation.  
Checkout [js-spatial-navigation] and [implementing TV remote control navigation] for details.  
You can install [js-spatial-navigation] with bower:
```sh
bower install https://github.com/luke-chang/js-spatial-navigation/
```
[bower]: http://bower.io/
[js-spatial-navigation]: https://github.com/luke-chang/js-spatial-navigation/
[implementing TV remote control navigation]: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/TVs_connected_devices/TV_remote_control_navigation
