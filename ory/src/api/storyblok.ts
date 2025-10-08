import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({
  accessToken: process.env.EXPO_PUBLIC_STORYBLOK_TOKEN || 'YOUR_PREVIEW_TOKEN_HERE',
  cache: { type: 'memory' },
});

export default Storyblok;
