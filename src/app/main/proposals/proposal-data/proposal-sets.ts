import { ProposalSet } from "../proposal";

export type ProposalSetType = 'wam' | 'veka' | 'beka' | 'weka' | 'party' | 'custom';

export const PROPOSAL_SETS_FLANDERS: ProposalSetType[] = [
  'veka',
];

export const PROPOSAL_SETS_BRUSSELS: ProposalSetType[] = [
  'beka',
];

export const PROPOSAL_SETS_WALLONIA: ProposalSetType[] = [
  'weka',
];

export const PROPOSAL_SET_VEKP = [
  { id: 101, variant: 1 },
  { id: 102, variant: 1 },
  { id: 103, variant: 1 },
] as ProposalSet;

export const PROPOSAL_SET_BEKP = [
  { id: 201, variant: 1 },
  { id: 202, variant: 1 },
  { id: 203, variant: 1 },
] as ProposalSet;

export const PROPOSAL_SET_WEKP = [
  { id: 301, variant: 1 },
  { id: 302, variant: 1 },
  { id: 303, variant: 1 },
] as ProposalSet;

export const PROPOSAL_SET_VEKA = [
  { id: 1, variant: 3 },
  { id: 2, variant: 3 },
  { id: 104, variant: 2 },
  { id: 105, variant: 3 },
] as ProposalSet;

export const PROPOSAL_SET_BEKA = [
  { id: 1, variant: 3 },
  { id: 2, variant: 3 },
  { id: 204, variant: 2 },
  { id: 205, variant: 3 },
] as ProposalSet;

export const PROPOSAL_SET_WEKA = [
  { id: 1, variant: 3 },
  { id: 2, variant: 3 },
  { id: 304, variant: 2 },
  { id: 305, variant: 3 },
] as ProposalSet;
