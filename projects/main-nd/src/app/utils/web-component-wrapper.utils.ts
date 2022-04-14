import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadRemoteModuleOptions, loadRemoteModule } from '@angular-architects/module-federation';

export type WebComponentWrapperOptions = LoadRemoteModuleOptions & {
  elementName: string;
};

@Component({
  template: '<div #vc></div>'
})
export class WebComponentWrapper implements AfterContentInit {

  @ViewChild('vc', { read: ElementRef, static: true }) vc: ElementRef | undefined;

  constructor(private route: ActivatedRoute) { }

  async ngAfterContentInit() {

    const options = this.route.snapshot.data as WebComponentWrapperOptions;

    try {
        await loadRemoteModule(options);

        const element = document.createElement(options.elementName);
        if (this.vc) {
          this.vc?.nativeElement.appendChild(element);
        }
    }
    catch(error) {
        console.error(error);
    }

  }

}
