import { Box } from '@livepeer/design-system';
import { Player, PlayerProps } from '@livepeer/react';

export const DocsDemoPlayer = (props: PlayerProps) => {
  return (
    <Box css={{ mt: '$3', width: 500, maxWidth: '100%' }}>
      <Player {...props} />
    </Box>
  );
};
