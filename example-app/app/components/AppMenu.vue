<template>
  <Drawer
    ref="drawer"
    id="drawer"
    :gestureHandlerOptions="{
      failOffsetYStart: -10,
      failOffsetYEnd: 10
    }"
  >
    <GridLayout ~leftDrawer class="drawer" width="300" backgroundColor="white" rows="auto, *">
      <StackLayout backgroundColor="#eeeeee" padding="25">
        <GridLayout columns="80, *" height="100">
          <StackLayout col="0" class="avatar">
            <Label text="JS" />
          </StackLayout>
        </GridLayout>
        <StackLayout>
          <Label text="John Smith" fontWeight="bold" />
          <Label text="john.smith@example.com" />
        </StackLayout>
      </StackLayout>
      <ListView row="1" :items="items">
        <v-template>
          <Label :text="item.title" @tap="onCloseDrawer" />
        </v-template>
      </ListView>
    </GridLayout>

    <StackLayout ~mainContent backgroundColor="white">
      <Button @tap="onOpenDrawer" text="Open Drawer" width="250" marginTop="25" />
    </StackLayout>
  </Drawer>

</template>

<script lang="ts">
import Vue from 'nativescript-vue'
import { mapState } from 'vuex'

interface IData {
  // $refs: any
}
interface IMethods {
  onOpenDrawer(event: any): void
  onCloseDrawer(event: any): void
}
interface IComputed {}
interface IProps {}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  computed: {
    ...mapState(['showDrawer']),
    message() {
      return 'Blank {N}-Vue app';
    },
    items() {
      return new Array(100).fill({ title: 'My profile' });
    }
  },
  watch: {
    // showDrawer(val) {
    //   console.log('watch.showDrawer()', val)
    //   if (val) {
    //     // this.$refs['drawer'].open('left')
    //     const el = document.getElementById('drawer')
    //     el?.open('left')
    //     setTimeout(() => {
    //       this.$store.dispatch('setDrawerVisible', false)
    //     }, 2000)
    //   } else {
    //     // this.$refs['drawer'].close('left')
    //   }
    // }
  },
  methods: {
    onOpenDrawer(event) {
      // this.$refs['drawer'].open('left');
      this.$emit('onOpenDrawer', event)
    },
    onCloseDrawer(event) {
      // this.$refs['drawer'].close('left');
      this.$emit('onCloseDrawer', event)
    }
  },
  mounted () {
    // this?.$refs['drawer'].install()
  }
});
</script>

<style scoped lang="scss">
ActionBar {
  background-color: #42b883;
  color: white;
}
Button {
  background-color: #42b883;
  color: white;
}
.avatar {
  background-color: #42b883;
  border-radius: 40;
  height: 80;
  vertical-align: middle;
  Label {
    vertical-align: middle;
    horizontal-align: center;
    font-size: 30;
    color: white;
  }
}
.drawer {
  Button {
    background-color: transparent;
    margin: 0;
    padding: 0;
    border-color: #ccc;
    z-index: 0;
    border-width: 0 0 0.5 0;
    color: #222222;
    text-align: left;
    padding-left: 25;
    height: 50;
    font-size: 14;
  }
  Button:highlighted {
    background-color: #eeeeee;
    color: #222222;
  }
}
</style>
