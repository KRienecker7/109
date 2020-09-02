import { Component } from '@angular/core';
import { Post } from '../models/post';
import { DataService } from '../services/data.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  model = new Post();
  myFriends = [];

  constructor(private data: DataService, private shared: SharedService) {
    this.data.getAllFriends().subscribe(list => {
      this.myFriends = list.filter(f  => f.friendOf === this.shared.userName);
    });
   }

    onPost() {
      this.model.from = this.shared.userName;
      console.log("posting", this.model);

      // save on service
      this.data.savePost(this.model);

      //clear the form
      this.model = new Post();
   }

}
