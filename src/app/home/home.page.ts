import {Platform} from '@ionic/angular';
import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import ApkUpdater, {Update} from 'cordova-plugin-apkupdater';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  remote = 'https://raw.githubusercontent.com/kolbasa/cordova-plugin-apkupdater-demo/master/update';

  constructor(private http: HttpClient, public platform: Platform) {
    platform.ready().then(this.update.bind(this)).catch(console.error);
  }

  async update() {
    const manifest = await this.http.get<Update>(this.remote + '/update.json').toPromise();

    const remoteVersion = manifest.app.version.code;
    const installedVersion = (await ApkUpdater.getInstalledVersion()).version.code;

    if (remoteVersion > installedVersion) {
      console.log('Install needed');
      // await ApkUpdater.download(
      //   this.remote + '/update.zip',
      //   {
      //     zipPassword: 'aDzEsCceP3BPO5jy',
      //     onDownloadProgress: console.log,
      //     onUnzipProgress: console.log
      //   }
      // );
      // await ApkUpdater.install();
    }
  }

}
