import { Paddle, Environment } from '@paddle/paddle-node-sdk';

export default async function handler(req, res) {
  let apiKey = (
    process.env.PADDLE_API_KEY ||
    process.env.PADDLE_SERVER_API_KEY ||
    ''
  ).trim();
  apiKey = apiKey.replace(/^Bearer\s+/i, '').replace(/^["']|["']$/g, '').trim();

  const environment = (process.env.PADDLE_ENV || 'production').toLowerCase() === 'production'
    ? Environment.production
    : Environment.sandbox;

  if (!apiKey) {
    return res.status(500).json({ error: 'CONFIG_ERROR', message: 'Paddle server API key is not configured' });
  }

  const subId = req.query?.id || req.body?.subscriptionId || 'sub_01m2bkgcgv81xpr28fe90b2shf';

  try {
    const paddle = new Paddle(apiKey, { environment });

    // 1. Get target subscription
    const sub = await paddle.subscriptions.get(subId);

    // 2. Count total subscriptions
    const subListIter = paddle.subscriptions.list();
    const allSubs = [];
    for await (const s of subListIter) {
      allSubs.push({ id: s.id, status: s.status, customerId: s.customerId });
    }

    // 3. Check transactions for this subscription
    let txList = [];
    try {
      const txIter = paddle.transactions.list({ subscriptionId: [subId] });
      for await (const tx of txIter) {
        txList.push({
          id: tx.id,
          status: tx.status,
          billedAt: tx.billedAt,
          createdAt: tx.createdAt,
          total: tx.details?.totals?.total,
          grandTotal: tx.details?.totals?.grandTotal,
          currencyCode: tx.currencyCode
        });
      }
    } catch (txErr) {
      console.warn('Could not list transactions by subscriptionId:', txErr.message);
    }

    return res.status(200).json({
      success: true,
      subscription: {
        id: sub.id,
        status: sub.status,
        startedAt: sub.startedAt,
        nextBilledAt: sub.nextBilledAt,
        currentBillingPeriod: sub.currentBillingPeriod,
        items: sub.items.map(i => ({
          priceId: i.price?.id,
          name: i.price?.name,
          quantity: i.quantity,
          amount: i.price?.unitPrice?.amount,
          currencyCode: i.price?.unitPrice?.currencyCode
        }))
      },
      totalSubscriptionsCount: allSubs.length,
      allSubscriptions: allSubs,
      transactionsCount: txList.length,
      transactions: txList
    });
  } catch (error) {
    return res.status(500).json({
      error: 'INSPECT_FAILED',
      message: error?.message,
      code: error?.code
    });
  }
}
