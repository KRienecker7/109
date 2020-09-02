import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { observable, Observable } from 'rxjs';
import { Friend } from '../models/friend';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private allPost: Observable<Post[]>;
  private allFriends: Observable<Friend[]>;

  //collection: serivce <---> database
  name: string;
  postCollection: AngularFirestoreCollection<Post>;
  friendCollection:AngularFirestoreCollection<Friend>;

  constructor(private fst:AngularFirestore) {
    this.postCollection = fst.collection<Post>('posts');
    this.friendCollection = fst.collection<Friend>('friends');
   }

   private retrievePosts(){
     this.allPost = this.postCollection.valueChanges(); //everytime the value changes this will notify an update
   }

   private retrieveFriends() {
     this.allFriends = this.friendCollection.valueChanges();
   }

  public savePost(post) {
    let item = Object.assign({}, post); //source found inside {}, copy post into a simple(no nested prototypes) object
    this.postCollection.add(item);//destination
  }

  public getAllPost() {
    this.retrievePosts();
    return this.allPost; //returning an observable
  }

  public saveFriend(friend) {
    let item = Object.assign({}, friend);
    this.friendCollection
      .add(item)
      .then(() => console.log("Saved Correctly!"))
      .catch((error) => console.log("Error saving", error));
  }

  public getAllFriends() {
    this.retrieveFriends();
    return this.allFriends;
  }
}
