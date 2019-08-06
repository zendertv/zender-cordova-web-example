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
            
        // Retrieve saved values
	storage.get('targetId').then((val) => {
	 this.zenderconfig["targetId"]=val;
	});

	storage.get('channelId').then((val) => {
	 this.zenderconfig["channelId"]=val;
	});

    };

    public openZenderPlayer(){
        var targetId = this.zenderconfig["targetId"];
	var channelId = this.zenderconfig["channelId"];

        let url = "https://player2.zender.tv/"+targetId+"/"+channelId;
	let target = "_blank";
	let browser=this.theInAppBrowser.create(url,target,this.options);

	/*
	setTimeout(function(){ 
		console.log("tapping");
	browser.executeScript({code: 'document.getElementsByClassName("mutedtoggle")[0].click(); return true;' });
	}, 9000);
	*/
    }

    saveConfig() {
	console.log('saving targetId :', this.zenderconfig["targetId"]);
	console.log('saving channelId:',this.zenderconfig["channelId"]);

	this.storage.set('targetId',this.zenderconfig["targetId"]);
	this.storage.set('channelId',this.zenderconfig["channelId"]);

     }

}
