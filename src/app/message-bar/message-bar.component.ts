import { Component, Input, OnInit } from '@angular/core';

const LS_KEY_MESSAGES_PREFIX = 'ecorendum.readMessages.';

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.scss']
})
export class MessageBarComponent implements OnInit {
  @Input({ required: true }) translationKey!: string;

  hidden = true;

  ngOnInit(): void {
    this.hidden = localStorage.getItem(LS_KEY_MESSAGES_PREFIX + this.translationKey) === 'true';
  }

  close() {
    this.hidden = true;
    localStorage.setItem(LS_KEY_MESSAGES_PREFIX + this.translationKey, 'true');
  }
}
