import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NotesService } from '../../services/notes.service';
// import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notes: any = [];
  id: any = null;

  loggedIn = false;
  loggedUser: any = null;

  constructor(
    private notesService: NotesService,
    public afDB: AngularFireDatabase,
    public authService: AuthService
  ) {
    this.notesService.getNotes().valueChanges()
      .subscribe((res) => {
        this.notes = res.reverse();
      });

    this.authService.isLogged()
      .subscribe((result) => {
        if (result && result.uid) {
          this.loggedIn = true;
          setTimeout(() => {
            this.loggedUser = this.authService.getUser().currentUser.email;
          }, 500);
        } else {
          this.loggedIn = false;
        }
      }, (error) => {
        this.loggedIn = false;
      });
  }

  ngOnInit() {
  }

  login() {
    this.authService.loginWithGoogle();
  }

  logout() {
    this.authService.logout();
  }

  deleteNote(note) {
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.value) {
        this.notesService.deleteNote(note);
        swal(
          'Deleted!',
          'Your Note has been deleted.',
          'success'
        );
      }
    }).catch(err => {
      console.log(err);
      swal({
        type: 'error',
        title: 'Oops...',
        text: `Something went wrong! ${err}`
      });
    });
  }
}
