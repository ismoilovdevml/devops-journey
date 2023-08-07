import { Badge, Box, Button, Flex, Text } from '@livepeer/design-system';
import { Player, useAssetMetrics, useCreateAsset } from '@livepeer/react';
import { useRouter } from 'next/router';

import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { Spinner } from '../../core';

const activeStyle = {
  borderColor: 'white',
};

const acceptStyle = {
  borderColor: '#00a55f',
};

const rejectStyle = {
  borderColor: 'red',
};

export const Asset = () => {
  const router = useRouter();

  const [video, setVideo] = useState<File | undefined>();
  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: video.name, file: video }] as const,
        }
      : null,
  );
  const { data: metrics } = useAssetMetrics({
    assetId: asset?.[0].id,
    refetchInterval: 30000,
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0]);
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      'video/*': ['.mp4'],
    },
    maxFiles: 1,
    onDrop,
  });

  const style = useMemo(
    () => ({
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      ...(isDragActive ? activeStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  const isLoading = useMemo(
    () =>
      status === 'loading' ||
      (asset?.[0] && asset[0].status?.phase !== 'ready'),
    [status, asset],
  );

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
        ? 'Waiting'
        : progress?.[0].phase === 'uploading'
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === 'processing'
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress],
  );

  return (
    <Box css={{ my: '$6' }}>
      {!asset && (
        <Box
          css={{
            mb: '$3',
            width: '100%',
          }}
        >
          <Box
            as="div"
            css={{
              width: '100%',
              cursor: 'pointer',
              p: '$1',
              mb: '$0',
              height: 'auto',
              border: '1px solid $colors$green7',
              borderRadius: '$1',
            }}
            {...getRootProps({ style })}
          >
            <Box as="input" {...getInputProps()} />
            <Box
              as="p"
              css={{
                width: '100%',
                height: '100%',
                border: '1px dotted $colors$green7',
                borderRadius: '$1',
                m: 0,
                fontSize: '$3',
                p: '$3',
                transition: 'border .24s ease-in-out',
                minWidth: '296px',
                minHeight: '70px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text variant="gray">
                Drag and drop or{' '}
                <Box as="span" css={{ color: '$green9', fontWeight: 700 }}>
                  browse files
                </Box>
              </Text>
            </Box>
          </Box>

          {error?.message && (
            <Box>
              <Text variant="red">{error.message}</Text>
            </Box>
          )}
        </Box>
      )}

      {asset?.[0]?.playbackId && (
        <Box css={{ mt: '$2' }}>
          <Player title={asset[0].name} playbackId={asset[0].playbackId} />
        </Box>
      )}

      <Flex css={{ jc: 'space-between', mt: '$3', ai: 'center' }}>
        <Flex css={{ ai: 'center', gap: '$2' }}>
          {metrics?.metrics?.[0] && (
            <Badge size="2" variant="gray">
              Views: {metrics?.metrics?.[0]?.startViews}
            </Badge>
          )}
          {video ? (
            <Badge size="2" variant="gray">
              {video.name}
            </Badge>
          ) : (
            <Text size="2" variant="gray">
              Select a video file to upload.
            </Text>
          )}
          {progressFormatted && <Text size="2">{progressFormatted}</Text>}
        </Flex>
        {asset?.[0].id ? (
          <Button
            onClick={() =>
              router.push(`/examples/react/video-nft?id=${asset[0].id}`)
            }
            disabled={asset[0]?.status?.phase !== 'ready'}
            variant="green"
            size="2"
          >
            {isLoading && <Spinner size={16} css={{ mr: '$1' }} />}
            Mint an NFT ↗
          </Button>
        ) : (
          <Button
            type="submit"
            css={{ display: 'flex', ai: 'center' }}
            onClick={() => {
              createAsset?.();
            }}
            size="2"
            disabled={isLoading || !createAsset}
            variant="green"
          >
            {isLoading && <Spinner size={16} css={{ mr: '$1' }} />}
            Upload
          </Button>
        )}
      </Flex>
    </Box>
  );
};
