import { Proposal, TranslatedText } from './proposal';

export const PROPOSALS: Proposal[] = [
  new Proposal({
    title: [
      new TranslatedText('en', 'Test proposal')
    ],
    summary: [
      new TranslatedText('en', 'This is a summary a summary yeah')
    ],
    slug: [
      new TranslatedText('en', 'test-proposal')
    ]
  })
]
