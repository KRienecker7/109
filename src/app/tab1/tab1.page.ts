import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { firestore } from 'firebase';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  postToDisplay= [];

  constructor(private data:DataService, private shared: SharedService) {
    //subscribe to allPosts observable
    this.data.getAllPost().subscribe(list => {

      //filter to see only:
      /**
       * you sent
       * to everyone
       * to you
       */
      list = list.filter(p => p.from === this.shared.userName 
        || p.to === "Everyone" 
        || p.to === this.shared.userName);

      this.postToDisplay = list.map(p => {
        let wrongFormat: any = p.timeStamp;
        p.timeStamp = new firestore.Timestamp(wrongFormat.seconds, wrongFormat.nanoseconds).toDate();
        return p;
        });

        //sort the array of posts
        this.postToDisplay = this.postToDisplay.sort((a, b) =>{
          if(a.timeStamp > b.timestamp){
            return -1;  //switch them, put b first b then a
          }
          else {
            return 1; //they are fine,leave them in tha order (a -> b)
          }
        });


      //new firestore.TimeStamp(seconds, nano).toDate()
      console.log(this.postToDisplay);
    });
  }

}
