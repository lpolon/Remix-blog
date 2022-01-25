/*
for reference:
https://github.com/kentcdodds/kentcdodds.com/blob/579fd40a7c4a3852ffd1b61f7d3a737bdcf2b6d1/app/utils/mdx.tsx
*/

import * as mdxBundler from 'mdx-bundler/client';
import * as React from 'react';

function useMdxComponent(code: string) {
  return React.useMemo(() => mdxBundler.getMDXComponent(code), [code]);
}

export { useMdxComponent };
