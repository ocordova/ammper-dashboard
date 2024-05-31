import BelvoClient from "@/lib/belvo-client";
import { ApiResponseEnvelope, BelvoAccount } from "@/lib/definitions";

export const getAccount = async (
  accountId: string,
): Promise<ApiResponseEnvelope<BelvoAccount>> => {
  const client = new BelvoClient();

  try {
    const response = await client.get<BelvoAccount>(
      `/api/accounts/${accountId}/`,
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
