import BelvoClient from "@/lib/belvo-client";
import { ApiResponseEnvelope, BelvoTransaction } from "@/lib/definitions";

interface GetTransactionsParams {
  linkId: string;
  accountId: string;
  dateFrom: string;
  dateTo: string;
}

export const getTransactions = async (
  params: GetTransactionsParams,
): Promise<ApiResponseEnvelope<BelvoTransaction[]>> => {
  const client = new BelvoClient();
  const { linkId, accountId, dateFrom, dateTo } = params;

  try {
    const payload: Record<string, string> = {
      link: linkId,
      // account: accountId,
      date_from: dateFrom,
      date_to: dateTo,
    };
    const response = await client.post<BelvoTransaction[]>(
      `/api/transactions`,
      payload,
    );
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred while fetching transactions",
    };
  }
};
