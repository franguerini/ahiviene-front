import { Component } from '@angular/core';

import { LineasPage } from '../lineas/lineas';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LineasPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
