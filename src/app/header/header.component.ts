import { Component } from '@angular/core';
import { BUTTON_LABELS, HEADER_BUTTON_CELL_WIDTH_VAR } from '../../environments/buttonLabels';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public buttonLabels: string[] = BUTTON_LABELS;
  public labelPercent: string = HEADER_BUTTON_CELL_WIDTH_VAR;
  headerImage: string = environment.imageUrl + "/CajunTechLogoWhite.png";
  showCopyNotification: boolean = false;
  public users : string = "users";

  constructor(private router: Router) {
    //this is needed to allow the cajunTech image to go to root as it passes in the router object for goToRootPage
  }

  goToRootPage() {
    this.router.navigate(['/']);
  }

  onButtonClick(buttonLabel: string) {
    console.log(`Button ${buttonLabel} clicked`);
    //this is needed to allow the button to work it passes the string
  }

  copyPhoneNumber() {
    const text: string = "3076792101";
    if (text) { //if text is not null
      navigator.clipboard.writeText(text).then(() => {
        this.showCopyNotification = true;
        setTimeout(() => this.showCopyNotification = false, 3000)
        console.log('Phone number copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  }
}
