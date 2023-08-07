import { Box, Button, Flex, Text, TextField } from '@livepeer/design-system';
import { useAsset, useUpdateAsset } from '@livepeer/react';
import { Types } from 'aptos';

import { useRouter } from 'next/router';
import { Callout } from 'nextra-theme-docs';

import { useCallback, useContext, useMemo, useState } from 'react';

import { formatAddress } from '../../../lib/address';
import { ApiError } from '../../../lib/error';
import {
  CreateAptosTokenBody,
  CreateAptosTokenResponse,
} from '../../../pages/api/create-aptos-token';

import { AptosContext, Spinner } from '../../core';

declare global {
  interface Window {
    aptos: any;
  }
}

export const AptosNft = () => {
  const aptosClient = useContext(AptosContext);

  const isAptosDefined = useMemo(
    () => (typeof window !== 'undefined' ? Boolean(window?.aptos) : false),
    [],
  );

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    try {
      if (isAptosDefined) {
        await window.aptos.connect();
        const account: { address: string } = await window.aptos.account();

        setAddress(account.address);
      }
    } catch (e) {
      console.error(e);
    }
  }, [isAptosDefined]);

  const router = useRouter();

  const assetId = useMemo(
    () => (router?.query?.id ? String(router?.query?.id) : undefined),
    [router?.query],
  );

  const {
    data: asset,
    error,
    status: assetStatus,
  } = useAsset({
    assetId,
    enabled: assetId?.length === 36,
    refetchInterval: (asset) =>
      asset?.storage?.status?.phase !== 'ready' ? 5000 : false,
  });
  const { mutate: updateAsset, status: updateStatus } = useUpdateAsset(
    asset
      ? {
          assetId: asset.id,
          storage: {
            ipfs: true,
            metadata: {
              name,
              description,
            },
          },
        }
      : null,
  );

  const [isCreatingNft, setIsCreatingNft] = useState(false);

  const isLoading = useMemo(
    () =>
      assetStatus === 'loading' ||
      updateStatus === 'loading' ||
      (asset && asset?.status?.phase !== 'ready') ||
      (asset?.storage && asset?.storage?.status?.phase !== 'ready') ||
      isCreatingNft,
    [asset, assetStatus, updateStatus, isCreatingNft],
  );

  const [creationHash, setCreationHash] = useState('');

  const mintNft = useCallback(async () => {
    setIsCreatingNft(true);

    try {
      if (address && aptosClient && asset?.storage?.ipfs?.nftMetadata?.url) {
        const body: CreateAptosTokenBody = {
          receiver: address,
          metadataUri: asset.storage.ipfs.nftMetadata.url,
        };

        const response = await fetch('/api/create-aptos-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const json = (await response.json()) as
          | CreateAptosTokenResponse
          | ApiError;

        if ((json as CreateAptosTokenResponse).tokenName) {
          const createResponse = json as CreateAptosTokenResponse;

          const transaction = {
            type: 'entry_function_payload',
            function: '0x3::token_transfers::claim_script',
            arguments: [
              createResponse.creator,
              createResponse.creator,
              createResponse.collectionName,
              createResponse.tokenName,
              createResponse.tokenPropertyVersion,
            ],
            type_arguments: [],
          };

          const aptosResponse: Types.PendingTransaction =
            await window.aptos.signAndSubmitTransaction(transaction);

          const result = await aptosClient.waitForTransactionWithResult(
            aptosResponse.hash,
            { checkSuccess: true },
          );

          setCreationHash(result.hash);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreatingNft(false);
    }
  }, [
    address,
    aptosClient,
    asset?.storage?.ipfs?.nftMetadata?.url,
    setIsCreatingNft,
  ]);

  return !assetId ? (
    <Box css={{ my: '$2' }}>
      <Callout type="error" emoji="⚠️">
        <p>
          This is an extension of the{' '}
          <a href="/examples/react/view-asset">Create Asset</a> example. Please
          be sure to go through that example before trying this one -{' '}
          <strong>
            you will need an asset ID from that example in this demo.
          </strong>
        </p>
      </Callout>
    </Box>
  ) : (
    <Box css={{ my: '$2' }}>
      <Button
        size="3"
        disabled={!isAptosDefined || Boolean(address)}
        onClick={connectWallet}
        variant="green"
      >
        {!address ? (
          'Connect Wallet'
        ) : (
          <>
            <Box
              css={{
                mr: '$1',
                backgroundColor: '#1A88F8',
                width: 24,
                height: 24,
                borderRadius: '100%',
              }}
            />
            {formatAddress(address)}
          </>
        )}
      </Button>
      {!isAptosDefined && (
        <Box css={{ mt: '$2' }}>
          <Text variant="red">
            You must install an Aptos wallet (we recommend{' '}
            <a
              href="https://aptos.dev/guides/install-petra-wallet-extension"
              target="_blank"
              rel="noreferrer"
              aria-selected="false"
            >
              Petra
            </a>{' '}
            wallet).
          </Text>
        </Box>
      )}
      {address && (
        <>
          <Box
            css={{
              my: '$3',
              width: '100%',
            }}
          >
            <Text css={{ mb: '$1' }} variant="gray">
              Asset ID
            </Text>
            <TextField disabled size="3" value={assetId} />

            {asset?.storage?.ipfs?.nftMetadata?.url ? (
              <>
                <Text css={{ my: '$1' }} variant="gray">
                  Metadata IPFS CID
                </Text>
                <TextField
                  disabled
                  size="3"
                  value={asset?.storage?.ipfs?.nftMetadata?.url}
                />
              </>
            ) : (
              <>
                <Text css={{ my: '$1' }} variant="gray">
                  Name
                </Text>
                <TextField
                  size="3"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <Text css={{ my: '$1' }} variant="gray">
                  Description
                </Text>
                <TextField
                  size="3"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </>
            )}

            {error?.message && (
              <Box>
                <Text variant="red">{error.message}</Text>
              </Box>
            )}
          </Box>
          <Flex css={{ jc: 'flex-end', mt: '$4', ai: 'center' }}>
            {asset?.status?.phase === 'ready' &&
            asset?.storage?.status?.phase !== 'ready' ? (
              <Button
                css={{ display: 'flex', ai: 'center' }}
                onClick={() => {
                  updateAsset?.();
                }}
                variant="green"
                size="2"
                disabled={
                  !updateAsset ||
                  !assetId ||
                  isLoading ||
                  Boolean(asset?.storage?.ipfs?.cid) ||
                  !name ||
                  !description
                }
              >
                {isLoading && <Spinner size={16} css={{ mr: '$1' }} />}
                Upload to IPFS
              </Button>
            ) : creationHash ? (
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://explorer.aptoslabs.com/txn/${creationHash}?network=Devnet`}
              >
                <Button
                  css={{ display: 'flex', ai: 'center' }}
                  size="2"
                  variant="green"
                >
                  View Mint Transaction
                </Button>
              </a>
            ) : asset?.storage?.status?.phase === 'ready' ? (
              <Button
                css={{ display: 'flex', ai: 'center' }}
                onClick={mintNft}
                size="2"
                disabled={isLoading}
                variant="green"
              >
                {isLoading && <Spinner size={16} css={{ mr: '$1' }} />}
                Mint NFT
              </Button>
            ) : (
              <></>
            )}
          </Flex>
        </>
      )}
    </Box>
  );
};
