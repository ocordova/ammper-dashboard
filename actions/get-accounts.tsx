"use server";
import BelvoClient from "@/lib/belvo-client";
import { BELVO_LINK_ID } from "@/lib/constants";
import { ApiResponseEnvelope, BelvoAccount } from "@/lib/definitions";

export const getAccounts = async (): Promise<
  ApiResponseEnvelope<BelvoAccount[]>
> => {
  const client = new BelvoClient();

  try {
    // For this example the linkId is harcoded
    const params: Record<string, string> = {
      link: BELVO_LINK_ID,
    };

    const response = await client.post<BelvoAccount[]>(
      "/api/accounts/",
      params,
    );

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred while fetching user data",
    };
  }
};
