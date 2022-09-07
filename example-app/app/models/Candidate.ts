import { ICandidateIdentity } from './CandidateIdentity'

interface ICandidateValidityItem {
  valid: boolean
  type: string
  details: string
  updated: number
  _id: string
}

interface ICandidateScore {
  _id: string
  address: string
  updated: number
  total: number
  aggregate: number
  inclusion: number
  spanInclusion: number
  discovered: number
  nominated: number
  rank: number
  unclaimed: number
  bonded: number
  faults: number
  offline: number
  randomness: number
  location: number
  councilStake: number
  democracy: number
  asn: number
  country: number
  nominatorStake: number
  provider: number
  region: number
  delegations: number
  __v: number
}

export interface CandidateModel {
  _id: number
  chain: string
  name: string
  discoveredAt: number
  nominatedAt: number
  offlineSince: number
  rank: number
  faults: number
  invalidityReasons: string
  unclaimedEras: [string]
  inclusion: number
  stash: string
  kusamaStash: string
  commission: number
  identity: ICandidateIdentity
  active: boolean
  valid: boolean
  validity: [ICandidateValidityItem]
  score: ICandidateScore
  total: number
  location: string
  councilStake: number
  councilVotes: [string]
  democracyVoteCount: number
  democracyVotes: [number]
  stale: boolean
  updatedAt: string
}
