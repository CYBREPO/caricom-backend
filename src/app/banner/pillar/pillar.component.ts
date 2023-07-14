import { Component, ElementRef, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Adapter from './ckEditorAdaptor';

@Component({
  selector: 'app-pillar',
  templateUrl: './pillar.component.html',
  styleUrls: ['./pillar.component.scss']
})
export class PillarComponent {

  public Editor = ClassicEditor;
  mycontent: any;
  ckeConfig: any;
  @ViewChild('piller') piller: ElementRef<any>;

  onReady(event: any) {
    event.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new Adapter(loader, event.config);
    };
  }

  submit() {
    console.log(this.piller);
    // let imgTagSrc = this.mycontent.split('');
    let rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
    let m;
    // files
    while ( m = rex.exec( this.mycontent ) ) {
        // urls.push( m[1] );
    }
    // var arr = dataurl.split(','),
    //   mime = arr[0].match(/:(.*?);/)[1],
    //   bstr = atob(arr[arr.length - 1]),
    //   n = bstr.length,
    //   u8arr = new Uint8Array(n);
    // while (n--) {
    //   u8arr[n] = bstr.charCodeAt(n);
    // }
    // return new File([u8arr], filename, { type: mime });
  }

}

class MyUploadAdapter {

  loader: any;
  constructor(loader: any) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file
      .then((file: any) => new Promise((resolve, reject) => {
        // this._initRequest();
        // this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      }));
  }


  // Prepares the data and sends the request.
  _sendRequest(file: any) {
    const data = new FormData();

    data.append('upload', file);
  }
}
