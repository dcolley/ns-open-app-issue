// import axios from 'axios'
import { Http } from '@nativescript/core'
import { CandidateModel } from '../models/Candidate'

export default class CandidateService {
  private chain: string = 'kusama'
  private candidates: CandidateModel[] = []

  constructor(chain: string) {
    console.log('CandidateService()... ' + this.chain)
    this.chain = chain
    this.init()
  }

  async init() {
    console.log('CandidateService.init()... ' + this.chain)
    const url = "https://api.metaspan.io/api/"+this.chain+"/candidate"
    try {
      const ret: any = await Http.getJSON(url)
      if (ret) {
        console.log('found ' + ret.length + ' candidates')
        this.candidates = ret
      } else {
        console.log('what did we get?', ret)
      }  
    } catch (err) {
      console.warn(err)
    }
  }

  getCandidates(): CandidateModel[] {
    console.log('CandidateService.getCandidates()...')
    return this.candidates || []
  }

  getCandidateByStash(stash: string): CandidateModel | undefined {
    return this.candidates.find(model => model.stash === stash) || undefined
  }
}
