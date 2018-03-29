import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {NgForm} from '@angular/forms';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  posts;
  constructor(private data: AngularFireDatabase,
              private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getData().subscribe(res => {
      this.posts = res;
    });

  }
  onSubmit(post1: NgForm) {
    const form = {
      name: post1.value.username,
      post: post1.value.textArea
    }
    console.log(post1);
    this.firebaseService.addData(form);
  }
}
