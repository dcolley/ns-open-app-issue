<template>
  <Page>
    <AppMenu @onOpenDrawer="onOpenMenu" @onCloseDrawer="onCloseMenu"/>
    <ActionBar>
      <DockLayout>
        <Label text="metaspan" dock="left" />
        <Label :text="chain" dock="center" />
        <ActivityIndicator :busy="loading" @busyChange="onBusyChanged" />
        <Button @tap="onOpenDrawer('right')" text="Menu" width="50" dock="right" />
      </DockLayout>
    </ActionBar>

    <Drawer ref="drawer">
      <!-- <GridLayout ~leftDrawer class="drawer" width="65%" height="100%" backgroundColor="white" padding="25">
        <Label text="Left Drawer" verticalAlignment="top" />
      </GridLayout> -->

      <GridLayout ~rightDrawer class="drawer" width="65%" height="100%" backgroundColor="white" padding="25">
        <Label text="Right Drawer" verticalAlignment="top" />
        <!-- <a href="myapp://views/navigate.html">Open App</a> -->
        <Button @tap="openApp()" text="Open App" width="50" dock="right" />
      </GridLayout>

      <!-- <GridLayout ~topDrawer class="drawer" height="65%" width="100%" backgroundColor="white" padding="25">
        <Label text="Top Drawer" verticalAlignment="top" />
      </GridLayout> -->

      <!-- <GridLayout ~bottomDrawer class="drawer" height="65%" width="100%" backgroundColor="white" padding="25">
        <Label text="Bottom Drawer" verticalAlignment="top" />
      </GridLayout> -->

      <!-- <StackLayout ~mainContent backgroundColor="white">
        <Button @tap="onOpenDrawer('left')" text="Open Left Drawer" width="250" marginTop="25" />
        <Button @tap="onOpenDrawer('right')" text="Open Right Drawer" width="250" marginTop="25" />
        <Button @tap="onOpenDrawer('top')" text="Open Top Drawer" width="250" marginTop="25" />
        <Button @tap="onOpenDrawer('bottom')" text="Open Bottom Drawer" width="250" marginTop="25" />
      </StackLayout> -->
      <PullToRefresh ~mainContent @refresh="onPullToRefresh">
        <Placeholder @creatingView="creatingView" />
        <ListView
          height="100%"
          for="item in list"
          @itemTap="onTap">
          <v-template>
            <GridLayout
              height="40"
              borderRadius="10"
              class="bg-secondary"
              rows="*, auto, auto"
              columns="*"
              margin="5 10"
              padding="0"
            >
              <!-- <image row="0" margin="0" stretch="aspectFill" :src="item.image" /> -->
              <Label
                row="1"
                margin="10 10 0 10"
                fontWeight="700"
                class="text-primary"
                fontSize="18"
                :text="item.name"
              />
              <Label
                row="2"
                margin="0 10 10 10"
                class="text-secondary"
                fontSize="14"
                textWrap="true"
                :text="item.stash"
              />
            </GridLayout>
          </v-template>
        </ListView>
      </PullToRefresh>

    </Drawer>

  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { mapState } from 'vuex'
import { availableSync } from '@nativescript/appavailability'
import { Utils } from '@nativescript/core'
// import { EventData } from "tns-core-modules/data/observable";

import AppMenu from "./AppMenu.vue";
import { CandidateModel } from '../models/Candidate'
// import CandidateService from '../services/CandidateService'
// import Details from './Details.vue'
import Candidate from './Candidate.vue'
// import Label from 'nativescript-vue'

// const flickService = new FlickService()
// const candidateService = new CandidateService('kusama')

interface IData {
  refreshing: boolean
}
interface IMethods {
  // onPageLoaded(event: EventData): void
  creatingView(args: any): void
  onPullToRefresh(args: any): void
  onTap(args: any): void
  onBusyChanged(event: any): void
  onOpenDrawer(side: string): void
  onOpenMenu(event: any): void
  onCloseMenu(event: any): void
  openApp(): void
}
interface IComputed {
  loading: boolean
  message: string
  chain: string
  list: CandidateModel[]
}
interface IProps {}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  components: {
    AppMenu
},
  computed: {
    message() {
      return "Blank {N}-Vue app";
    },
    ...mapState(['chain']),
    ...mapState('candidate', ['loading', 'list'])
  },
  data () {
    return {
      refreshing: false,
      // flicks: flickService.getFlicks(),
      // candidates: [] as CandidateModel[]
    }
  },
  methods: {
    // async onPageLoaded(event: EventData) {
    //   console.log('onPageLoaded()', event)
    // },
    creatingView: function(args: any) {
      // const nativeView = new Label();
      // nativeView.text = "Native View - iOS";
      args.view = 'nativeView';
    },
    async onPullToRefresh (args: any) {
      console.log('onPullToRefresh()...')
      // this.candidates = await candidateService.getCandidates()
      await this.$store.dispatch('candidate/setList')
      var pullRefresh = args.object;
      setTimeout(function() {
        pullRefresh.refreshing = false;
      }, 1000);
    },
    onTap (args: any) {
      const stash = args.item.stash
      this.$navigateTo(Candidate, {
        props: { chain: this.chain, stash }
      })
    },
    onBusyChanged (event) {
      console.log('onBusyChanged', event)
    },
    onOpenDrawer (side: string) {
      (this.$refs['drawer'] as any)?.open(side);
    },
    onOpenMenu (event: any) {
      // console.log('onOpenMenu', event)
    },
    onCloseMenu (event: any) {
      // console.log('onCloseMenu', event)
    },
    async openApp () {
      // <a href="myapp://views/navigate.html"
      console.log('openApp() firing... myapp')
      // await Utils.openUrl('metaspan://kusama/hello=world&one=2')
      // console.log('openApp() done...')
      // if (availableSync('myapp')) {
      //   console.log('will try to open myapp')
        Utils.openUrl(
          'myapp://user?user_id=eddyverbruggen'
        )
      // } else {
      //   console.log('falling back to website')
      //   Utils.openUrl('https://metaspan.com/#metapay')
      // }
    }
  },
  async mounted () {
    console.log('Home.vue mounted...')
    // await candidateService.init()
    // this.candidates = await candidateService.getCandidates()
  }
})
</script>

<style scoped lang="scss">
@import '@nativescript/theme/scss/variables/blue';

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}

.mdi {
  font-family: "Material Design Icons", "materialdesignicons-webfont";
}
</style>
