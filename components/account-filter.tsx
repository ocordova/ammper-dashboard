"use client";
import qs from "query-string";
import { BelvoAccount } from "@/lib/definitions";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AccountFilter({
  accounts,
}: {
  accounts: BelvoAccount[];
}) {
  const defaultAccount = accounts[0];

  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();
  const accountId = params.get("accountId") || defaultAccount.id;
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const onChange = (newValue: string) => {
    const query = {
      account: newValue,
    };
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };

  return (
    <Select defaultValue={defaultAccount.id} onValueChange={onChange}>
      <SelectTrigger className="h-9 rounded-md px-3">
        <SelectValue placeholder="Select account" />
      </SelectTrigger>
      <SelectContent>
        {!accounts
          ? []
          : accounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                <div className="flex items-center">
                  <p className="line-clamp-1">{account.name}</p>
                </div>
              </SelectItem>
            ))}
      </SelectContent>
    </Select>
  );
}
