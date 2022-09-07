<template>
  <Page>
    <ActionBar :title="model.name" />
    <ScrollView height="100%">
      <StackLayout>
        <Image margin="0" stretch="aspectFill" :src="model.image" />
        <StackLayout padding="10 20">
          <StackLayout v-for="detail in Object.keys(model)" :key="detail">
            <Label
              marginTop="15"
              fontSize="16"
              fontWeight="700"
              class="text-primary"
              textWrap="true"
              :text="detail"
            />
            <Label
              fontSize="14"
              class="text-secondary"
              textWrap="true"
              :text="model[detail]"
            />
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'
import { mapState } from 'vuex'
import { CandidateModel } from '../models/Candidate'
// import CandidateService from '../services/CandidateService'

interface IData {
}
interface IMethods {
  // onPullToRefresh(args: any): void
  // onFlickTap(args: any): void
}
interface IComputed {
  model: CandidateModel | undefined
}
interface IProps {
  chain: string
  stash: string
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  props: {
    stash: { type: String },
    chain: { type: String }
  },
  computed: {
    ...mapState('candidate', ['model'])
  },
  data () {
    return {
      // // flick: flickService.getFlickById(this.id)
      // model: {} as CandidateModel,
    }
  },
  async created () {
    console.log('Candidate.vue: created()...')
    this.$store.dispatch('candidate/getModel', this.stash)
  },
  async mounted () {
    console.log('Candidate.vue: mounted()...')
    // this.model = await this.store.getCandidateByStash(this.stash)
  }
})
</script>