import { Box, keyframes } from '@livepeer/design-system';

const rotate = keyframes({
  '100%': { transform: 'rotate(360deg)' },
});

export const Spinner = ({
  css = {},
  size = 26,
  speed = '1s',
}: {
  css?: object;
  size?: number;
  speed?: string;
}) => (
  <Box
    css={{
      color: '$gray4',
      border: '3px solid',
      borderColor: '$blue7',
      borderRadius: '50%',
      borderTopColor: 'inherit',
      width: size,
      height: size,
      maxWidth: size,
      maxHeight: size,
      animation: `${rotate} ${speed} linear`,
      animationIterationCount: 'infinite',
      ...css,
    }}
  />
);
