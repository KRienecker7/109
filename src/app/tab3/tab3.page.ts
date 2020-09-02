import { Component } from '@angular/core';
import { Friend } from '../models/friend';
import { DataService } from '../services/data.service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [Camera]
})
export class Tab3Page {

  model = new Friend();
  myFriend: Friend[] = [];
  
  constructor(private data: DataService, private share: SharedService, private camera: Camera) {
    this.data.getAllFriends().subscribe(list => {
      this.myFriend = list.filter(f  => f.friendOf === this.shared.userName);
    });
  }


 /**Install:
  * npm install cordova
  * ionic cordova plugin add cordova-plugin-camera
  * npm install @iono-native/camera
  */

  //sourceType:
  //0 -choose from gallery
  //1 -take a pic with camera

  choosePic(sourceType: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType

    };

    this.camera.getPicture(options).then(
      ImageData => {
        let base64Image = "data:image/jpeg;bases64," + ImageData;
        console.log(base64Image);
        this.model.imageUrl = base64Image;
      },
      err=>{
      //handle error
      console.log("The user cancelled the operation");
      }
    );
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
