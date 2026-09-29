"use server";

import { CloudFrontClient, CreateInvalidationCommand } from "@aws-sdk/client-cloudfront";
import { auth } from "@clerk/nextjs/server";

const cloudfront = new CloudFrontClient({ region: "eu-north-1" });

export type PublishResultsState = {
  success: boolean;
  publishedAt?: string;
};

export async function publishResults(): Promise<PublishResultsState> {
  await auth.protect();
  await cloudfront.send(
      new CreateInvalidationCommand({
        DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
        InvalidationBatch: {
          CallerReference: `publish-${Date.now()}`,
          Paths: { Quantity: 1, Items: ["/*"] },
        },
      })
    );

    return { success: true, publishedAt: new Date().toISOString() };
}