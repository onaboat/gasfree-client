
import { OnRpcRequestHandler, OnTransactionHandler } from '@metamask/snaps-types';
import { panel, text, heading } from '@metamask/snaps-ui';


// get transaction details and display in a metamask snap
export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin,
}: {
  transaction: string; // Specify the type of the 'transaction' parameter
  chainId: string;
  transactionOrigin: string;
}) => {
  const transactionInfo = JSON.parse(transaction)
  const chainIdInfo = chainId;
  const transactionOriginInfo = transactionOrigin;
 

  return {
    content: panel([
      heading('My Transaction Insights'),
      text(`${transactionInfo}`),
      text(`${chainIdInfo}`),
      text(`${transactionOriginInfo}`)
    ])
  };
};



/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
