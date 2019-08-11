import { Component } from '@angular/core';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  theInAppBrowser : InAppBrowser;

  zenderconfig = new Map();
  iframeUrl = "";
  environments = [
	'production',
	'staging'
  ]

   options : InAppBrowserOptions = {
	    location : 'yes',//Or 'no'
            footer: 'no',
	    hidden : 'no', //Or  'yes'
	    clearcache : 'yes',
	    clearsessioncache : 'yes',
	    zoom : 'no',//Android only ,shows browser zoom controls
	    hardwareback : 'no',
	    mediaPlaybackRequiresUserAction : 'no',
	    allowInlineMediaPlayback : 'yes',//iOS only

	    shouldPauseOnSuspend : 'no', //Android only
	    closebuttoncaption : 'Close', //iOS only
	    closebuttoncolor : '#00ff00', //iOS only
	    disallowoverscroll : 'no', //iOS only
	    toolbar : 'yes', //iOS only
	    usewkwebview: 'yes',
	    useWideViewPort: 'no',
	    enableViewportScale : 'yes', //iOS only
	    presentationstyle : 'fullscreen',//iOS only
	    fullscreen : 'yes',//Windows only
    };

   constructor(private storage: Storage) {
	this.theInAppBrowser=new InAppBrowser();

  	window.addEventListener("message", this.receiveMessage, false);
            
        // Retrieve saved values
	storage.get('ZenderTargetId').then((val) => {
	 this.zenderconfig["targetId"]=val;
	});

	storage.get('ZenderChannelId').then((val) => {
	 this.zenderconfig["channelId"]=val;
	});

	storage.get('ZenderEnvironment').then((val) => {
		if (!val) {
		 this.zenderconfig["environment"]="production";
		} else {
		 this.zenderconfig["environment"]=val;
		}
	});

    };

    public receiveMessage(event) {
	console.log("=====> receive message :", event.data);
	// Experimental
	// Needs more mapping
	if (event.data.type=="zender-native-client-close-player") {
		var player = document.getElementById('player');
		player.innerHTML="";
	}
    };

    public getUrlPrefix(environment) {
	if (this.zenderconfig["environment"] == "production") {
		return  "https://player2.zender.tv/";
	} else {
		return "https://player2.staging.zender.tv/";
	}
    }

    public openZenderPlayerIframe(){
        var targetId = this.zenderconfig["targetId"];
	var channelId = this.zenderconfig["channelId"];

	// close=shows the close button to close the browser
	// mutedMobile = doesn't mute on ios Native
        this.iframeUrl = this.getUrlPrefix()+targetId+"/channels/"+channelId+"/streams?close=true&mutedMobile=false&events=%22*%22"
	console.log("===> url ",this.iframeUrl);
	var iframe = document.createElement('iframe');
	iframe.setAttribute('src',this.iframeUrl);
	iframe.setAttribute('width',"100%");
	iframe.setAttribute('height',"100%");
	var player = document.getElementById('player');
	player.appendChild(iframe);

    };

    public openZenderPlayerInAppBrowser(){
        var targetId = this.zenderconfig["targetId"];
	var channelId = this.zenderconfig["channelId"];

        let url = this.getUrlPrefix()+targetId+"/channels/"+channelId+"/streams/?close=true&mutedMobile=false&events=%22*%22";
	let target = "_blank";
	let browser=this.theInAppBrowser.create(url,target,this.options);

    }

    saveConfig() {
	console.log('saving targetId :', this.zenderconfig["targetId"]);
	console.log('saving channelId:',this.zenderconfig["channelId"]);
	console.log('saving environment:',this.zenderconfig["environment"]);

	this.storage.set('ZenderTargetId',this.zenderconfig["targetId"]);
	this.storage.set('ZenderChannelId',this.zenderconfig["channelId"]);
	this.storage.set('ZenderEnvironment',this.zenderconfig["environment"]);

     }

}
