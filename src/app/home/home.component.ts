import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NotesService } from '../../services/notes.service';
// import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notes: any = [];
  id: any = null;

  constructor(
    private notesService: NotesService,
    public afDB: AngularFireDatabase,
  ) {
    this.notesService.getNotes().valueChanges()
      .subscribe((res) => {
        this.notes = res;
      });
  }

  ngOnInit() {
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
