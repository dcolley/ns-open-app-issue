import Vue from 'nativescript-vue'
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue'
Vue.use(RadSideDrawer)
import App from './components/App'

// import { handleOpenURL } from "nativescript-urlhandler" // .handleOpenURL;
import { registerUniversalLinkCallback } from "@nativescript-community/universal-links";
import { getUniversalLink } from "@nativescript-community/universal-links";

registerUniversalLinkCallback(function(appURL) {
  console.log('Got the following appURL', appURL);
});  

Vue.config.silent = !__DEV__

new Vue({
  render: h => h(App),
  methods: {
    // handleOpenURL(url) { console.log('handleOpenUrl', url) }
  },
  created() {
    console.log('app.js: created()', global.isIOS)
    // handleOpenURL(url) => { console.log('handleOpenUrl', url) }
    try {
      const ul = getUniversalLink();
      console.log('getUniversalLink:', ul)
    } catch(err) {
      console.log('handleOpenUrl error')
      console.log(err)
    }
}
}).$start()
