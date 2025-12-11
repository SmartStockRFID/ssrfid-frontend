"use client";

import { useFetchInventoryReadings } from "@/hooks/use-fetch-inventory-readings";
import type { InventoryStatus, InventorySummary } from "@/types";
import { cn } from "@/utils";
import { Badge } from "../ui/badge";

import { InventoriesListCard } from "./inventories-list";
import { InventoryDetailsCard } from "./inventory-details-card";

interface Props {
  inventories: InventorySummary[];
  className?: string;
}

export function InventoriesCards({ inventories }: Props) {
  const {
    selectedInventory,
    setSelectedInventory,
    inventoryReadings: inventoryDetails,
    requestStatus,
    fetchedInventoryId,
  } = useFetchInventoryReadings();

  return (
    <>
      <InventoriesListCard
        className="w-full md:w-1/2"
        inventories={inventories}
        selectedInventory={selectedInventory}
        setSelectedInventory={setSelectedInventory}
      />
      <InventoryDetailsCard
        fetchedInventoryId={fetchedInventoryId}
        className="hidden md:flex md:w-1/2"
        hasInventories={inventories.length > 0}
        selectedInventory={selectedInventory}
        setSelectedInventory={setSelectedInventory}
        inventoryReadings={inventoryDetails}
        fetchDetailsReqStatus={requestStatus}
      />
    </>
  );
}

export const InventoryStatusBadge = ({
  status,
}: {
  status: InventoryStatus;
}) => (
  <Badge
    className={cn("capitalize", {
      "bg-green-500": status === "finalizada",
      "bg-red-500": status === "cancelada",
      "bg-blue-400": status === "iniciada",
    })}
  >
    {status.substring(0, status.length - 1)}o
  </Badge>
);
