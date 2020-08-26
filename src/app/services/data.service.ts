import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private allPost: Observable<Post[]>;

  //collection: serivce <---> database
  name: string;
  postCollection: AngularFirestoreCollection<Post>;

  constructor(private fst:AngularFirestore) {
    this.postCollection = fst.collection<Post>('posts')
   }

   private retrievePosts(){
     this.allPost = this.postCollection.valueChanges(); //everytime the value changes this will notify an update
   }

  public savePost(post) {
    let item = Object.assign({}, post); //source found inside {}, copy post into a simple(no nested prototypes) object
    this.postCollection.add(item);//destination
  }

  public getAllPost() {
    this.retrievePosts();
    return this.allPost; //returning an observable
  }
}
