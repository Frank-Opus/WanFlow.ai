import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WanFlow',
    short_name: 'WanFlow',
    description: 'WanFlow 万物归流为企业提供数据标注与治理、流程编排与自动化、企业级智能体、人机协同交付和模型运营闭环能力。',
    start_url: '/',
    display: 'standalone',
    background_color: '#06111f',
    theme_color: '#06111f',
    icons: [
      {
        src: '/brand/logo-mark.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/brand/logo-mark.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
