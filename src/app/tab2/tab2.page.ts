import { Component } from '@angular/core';
import { Post } from '../models/post';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  model = new Post();

  constructor(private data: DataService) { }

    onPost() {
      this.model.from = "Kenny";
      console.log("posting", this.model);

      // save on service
      this.data.savePost(this.model);

      //clear the form
      this.model = new Post();
   }

}
