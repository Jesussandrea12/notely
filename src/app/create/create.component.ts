import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NotesService } from '../../services/notes.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  categories: any = [
    'Work',
    'Personal',
    'Project'
  ];

  note: any = {};
  id: any = null;

  constructor(
    private notesService: NotesService,
    public afDB: AngularFireDatabase,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
    if (this.id !== 'new') {
      this.notesService.getNote(this.id)
        .valueChanges().subscribe(res => {
          this.note = res;
          // this.note = JSON.parse(JSON.stringify(res));
        });
    }
   }

  ngOnInit() {
  }

  saveNote(): void {
    if (!this.note.id) {
      this.note.id = Date.now();
    }
    this.notesService.createNote(this.note)
      .then(() => {
        this.note = {};
        this.openSnackBar('Note saved', 'success');
      })
      .catch(err => {
        console.log(err);
        this.openSnackBar('Opps, Something has happened', 'error');
      });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
