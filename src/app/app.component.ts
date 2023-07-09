import { Component } from '@angular/core';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'carifacts';

  showLoader: boolean = false;
  
  constructor(private loaderService: LoaderService) {

  }
  
  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
      setTimeout(() => {
        this.showLoader = val;
      }, 0);
    });
  }

}
