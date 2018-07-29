import { Component, OnInit, Inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AuthService } from '../services/auth.service';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  message: any = {};
  constructor(
    private authService: AuthService,
    private swUpdate: SwUpdate,
    public msgService: MessagingService) { }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((v) => {
        if (confirm('Actualización disponible, deseas obtenerla?')) {
          window.location.reload();
        }
      });
    }

    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }
}
