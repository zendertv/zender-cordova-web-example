# zender-cordova-web-example
Example Ionic project to use Zender inside of ionic :
- using an iframe

- using the inAppBrowser <https://ionicframework.com/docs/native/in-app-browser>

## Requirements
- Needs to have a whitelist + security origin set correctly

## useful commands
Needs Ionic
```
npm install
```

```
ionic cordova run ios
ionic cordova run ios --live-reload
ionic cordova run ios --live-reload --device
ionic cordova run ios --live-reload --emulator
ionic cordova run android
```

Add to your config.xml
```
<preference name="AllowInlineMediaPlayback" value="true" />
```

- iOS, Debug via safari/console
- android, Debug via remote devices
