import Vue from 'nativescript-vue'

// import { handleOpenURL } from 'nativescript-urlhandler';

Vue.registerElement(
  'PullToRefresh',
  () => require('@nativescript-community/ui-pulltorefresh').PullToRefresh
);

import DrawerPlugin from '@nativescript-community/ui-drawer/vue'
Vue.use(DrawerPlugin);

import Home from './components/Home.vue'
// import Settings from './components/Settings.vue'

import { store } from './store'
// import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
// TNSFontIcon.debug = true;
// TNSFontIcon.paths = {
//   'mdi': './assets/css/materialdesignicons.css'
// };
// TNSFontIcon.loadCss();
// Vue.filter('fonticon', fonticon);

// import { SubstrateAPI } from './plugins/substrate'
// Vue.prototype.$substrate = new SubstrateAPI({ lite: false, endpoint: 'dwellir' })

declare let __DEV__: boolean;

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = !__DEV__

// import * as urlparse from 'url-parse'
import { registerUniversalLinkCallback } from "@nativescript-community/universal-links";
import url from 'url'
// use this if app is protected by Login page...
// import { getUniversalLink } from "@nativescript-community/universal-links";

// registerUniversalLinkCallback(function(appURL) {
//   console.log('Got the following appURL', appURL);
// })

new Vue({
  methods: {
    handleUniversalLink (appURL: string) {
      const parsed = url.parse(appURL)
      console.log('app.ts: handleUniversalLink():', parsed)
    }
  },
  async created () {
    console.log('app.ts: created()')
    registerUniversalLinkCallback(this.handleUniversalLink)    
  },
  store,
  render: (h) => h('frame', [h(Home)]),
}).$start()
