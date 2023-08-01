import { OnTransactionHandler } from '@metamask/snaps-types';
import { heading, panel, text, image } from '@metamask/snaps-ui';

// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({ 
  transaction,
  chainId,
  transactionOrigin,
 }) => {

  // Get fields from the transaction object.
  const address = transaction.to;
  // const tranactionInfo = JSON.stringify(transaction);
  // const chainIdInfo = chainId;
  // const transactionOriginInfo = transactionOrigin;

  // console.log('transaction', transaction);
  // console.log('chainId', chainId);
  // console.log('transactionOrigin', transactionOrigin);

  // Display transaction insights UI.
  return {
    content: panel({
      children: [
        heading('Transaction data Data'),
        image({
            src: 'https://placehold.co/600x400/png',
            width: 100,
            height: 100,
        }),
        text(`Some image`),
      ]
    })
  };
};
