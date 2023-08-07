import React from 'react';

export function IframePlayer() {
  return (
    <iframe
      src="https://lvpr.tv?v=667f7flfr0od837u"
      width={'100%'}
      height={530}
      allowFullScreen
      allow="autoplay; encrypted-media; picture-in-picture"
      sandbox="allow-scripts"
    />
  );
}
