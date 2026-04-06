import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WanFlow',
    short_name: 'WanFlow',
    description: 'WanFlow 万物归流为企业提供 AI 数据标注、自动化数据处理、流程自动化、Process as a Service 与模型运营服务。',
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
