import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    private user: Observable<firebase.User>;
    private authState: any;

    constructor(public afDB: AngularFireDatabase,
        public afAuth: AngularFireAuth) {
        this.isLogged();
        this.user = afAuth.authState;
    }
    authUser() {
        return this.user;
    }
    get currentUserId(): string {
        return this.authState !== null ? this.authState.uid : '';
    }
    public getUser() {
        return this.afAuth.auth;
    }
    loginWithGoogle() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    public logout() {
        this.afAuth.auth.signOut();
    }
    public isLogged() {
        return this.afAuth.authState;
    }
}
