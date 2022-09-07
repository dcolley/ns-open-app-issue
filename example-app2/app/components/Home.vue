<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden"/>
      <GridLayout columns="50, *">
        <Label class="action-bar-title" text="Home" colSpan="2"/>

        <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/>
      </GridLayout>
    </ActionBar>

    <GridLayout class="page__content">
      <Label class="page__content-icon fas" text.decode="&#xf015;"/>
      <Label class="page__content-placeholder" :text="message"/>
      <Button @tap="onOpenApp()" text="Open ExampleApp" width="50" dock="right" />
    </GridLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import { SelectedPageService } from "../shared/selected-page-service";
import { Utils } from '@nativescript/core'
// import { openApp } from "nativescript-open-app"


function openApp(appID, storeFallback, appleStoreId) {
  console.log('openApp()', appID, storeFallback, appleStoreId)
  if (storeFallback === void 0) { storeFallback = true; }
  var sharedApplication = UIApplication.sharedApplication;
  var url = NSURL.URLWithString(appID.trim());
  console.log('url:', url)
  // var url = appID.trim();
  if (sharedApplication.canOpenURL(url)) {
    // open app
    sharedApplication.openURL(url);
    return true;
  }
  else if (storeFallback && appleStoreId) {
    // can't open app - open store
    url = NSURL.URLWithString("itms-apps://itunes.apple.com/app/id" + appleStoreId);
    // url = "itms-apps://itunes.apple.com/app/id" + appleStoreId;
    if (sharedApplication.canOpenURL(url)) {
      sharedApplication.openURL(url);
    }
    else {
      // can't open store - open the website
      url = NSURL.URLWithString("https://itunes.apple.com/app/id" + appleStoreId);
      sharedApplication.openURL(url);
    }
  }
  return false;
}

export default {
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Home");
  },
  computed: {
    message() {
      return "<!-- Page content goes here -->";
    }
  },
  methods: {
    // onPageLoaded(event) {
    //   console.log('Home.vue: onPageLoaded()', event)
    // },
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    async onOpenApp () {
      // <a href="myapp://views/navigate.html"
      var appUrl = 'metaspan://user?user_id=eddyverbruggen'
      console.log('openApp() firing...', appUrl)
      // await Utils.openUrl('metaspan://kusama/hello=world&one=2')
      // console.log('openApp() done...')
      // if (availableSync('myapp')) {
      //   console.log('will try to open myapp')
      var appId = 'com.metaspan.ios.nativescript.exampleapp'
      // var appId = 'com.metaspan.exampleapp'
      var appStoreId = ''
      var webUrl = 'https://metaspan.io'
      var installed = openApp(appUrl, false);
      console.log("Is it installed? " + installed);
      try {
        Utils.openUrl(appUrl)
      } catch (err) {
        console.log('openUrl ERROR', err)
      }
      // } else {
      //   console.log('falling back to website')
      //   Utils.openUrl('https://metaspan.com/#metapay')
      // }

    }
  }
};
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
</style>
