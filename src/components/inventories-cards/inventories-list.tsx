import { PackageSearch } from "lucide-react";
import type { InventorySummary } from "@/types";
import { cn } from "@/utils";
import { Card, CardHeader, CardTitle } from "../ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { Typography } from "../ui/typography";
import { InventoryStatusBadge } from "./inventories-cards";

interface Props {
  className?: string;
  selectedInventory: InventorySummary | null;
  setSelectedInventory: (inventory: InventorySummary | null) => void;
  inventories: InventorySummary[];
}

export function InventoriesListCard(props: Props) {
  return (
    <Card className={cn(props.className)}>
      <CardHeader>
        <CardTitle className={cn("text-center", Typography.h3)}>
          Inventários
        </CardTitle>
      </CardHeader>

      <div className="px-3 sm:px-6">
        {props.inventories.length > 0 ? (
          <ul className="space-y-3 sm:space-y-4">
            {props.inventories.map((inv) => (
              <li
                key={inv.id}
                className={cn(
                  "bg-gray-100 hover:bg-gray-200 rounded-sm transition-colors box-border",
                  {
                    "outline-2 outline-blue-400 bg-gray-300 hover:bg-gray-300":
                      props.selectedInventory?.id === inv.id,
                  },
                )}
              >
                <button
                  className="flex items-center justify-between w-full p-3 cursor-pointer"
                  type="button"
                  onClick={() =>
                    props.setSelectedInventory(
                      props.selectedInventory?.id === inv.id ? null : inv,
                    )
                  }
                >
                  Inventário {inv.id}{" "}
                  <InventoryStatusBadge status={inv.status} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <Empty className="p-0 md:p-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PackageSearch />
              </EmptyMedia>
              <EmptyTitle>Sem inventários</EmptyTitle>
              <EmptyDescription>
                Nenhum inventário realizado com a pistola ainda.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        {/* {props.inventories.length > 0 && (
          <CardFooter className="px-0 mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )} */}
      </div>
    </Card>
  );
}
