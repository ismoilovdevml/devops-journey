import { Box, Text, TextField } from '@livepeer/design-system';
import { Player } from '@livepeer/react';
import { parseArweaveTxId, parseCid } from 'livepeer/utils';

import { useMemo, useState } from 'react';

export const DecentralizedStoragePlayback = () => {
  const [url, setUrl] = useState<string>('');

  const idParsed = useMemo(() => parseCid(url) ?? parseArweaveTxId(url), [url]);

  return (
    <Box css={{ my: '$6' }}>
      <Box
        css={{
          mb: '$3',
          width: '100%',
        }}
      >
        <Text css={{ my: '$1' }} variant="gray">
          IPFS or Arweave URL
        </Text>
        <TextField
          size="3"
          type="text"
          placeholder="ipfs://... or ar://"
          onChange={(e) => setUrl(e.target.value)}
        />

        {url && !idParsed && (
          <Text css={{ my: '$1' }} variant="red">
            Provided value is not a valid identifier.
          </Text>
        )}
      </Box>

      {idParsed && (
        <Box css={{ mt: '$2' }}>
          <Player
            title={idParsed.id}
            src={url}
            autoPlay
            muted
            autoUrlUpload={{ fallback: true, ipfsGateway: 'https://w3s.link' }}
          />
        </Box>
      )}
    </Box>
  );
};
