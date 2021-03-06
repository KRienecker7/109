import { Component } from '@angular/core';
import { Friend } from '../models/friend';
import { DataService } from '../services/data.service';

import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  model = new Friend();
  myFriend: Friend[] = [];
  
  constructor(private data: DataService, private shared: SharedService) {
    this.data.getAllFriends().subscribe(list => {
      this.myFriend = list.filter(f  => f.friendOf === this.shared.userName);
    });
  }

  //sourceType:
  //0 -choose from gallery
  //1 -take a pic with camera
  choosePic(sourceType: number) {
    /*
    code commented out as needed only if you plan to install it on a device
    if so, install:
    npm install codova
    ionic cordova plugin add cordova-plugin-camera
    npm install @ionic-native/camera
    */

    // const options: CameraOptions = {
    //   quality: 50,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType:this.camera.MediaType.PICTURE,
    //   correctOrientation: true,
    //   sourceType: sourceType

    // };

    // this.camera.getPicture(options).then(
    //   ImageData => {
    //     let base64Image = "data:image/jpeg;bases64," + ImageData;
    //     console.log(base64Image);
    //     this.model.imageUrl = base64Image;
    //   },
    //   err=>{
    //   //handle error
    //   console.log("The user cancelled the operation");
    //   }
    // );
  }

  onSave() {
    this.model.friendOf =this.shared.userName;
    console.log(this.model);
    //save
    this.data.saveFriend(this.model);
    
    //clear form
    this.model = new Friend();
  }
}
