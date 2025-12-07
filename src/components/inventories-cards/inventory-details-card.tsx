"use client";

import { AlertCircleIcon, Loader, PackageSearch, Tag } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  type InventoryDetails,
  type InventorySummary,
  RequestStatus,
} from "@/types";
import { cn } from "@/utils";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
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
  inventoryDetails: InventoryDetails | null;
  hasInventories: boolean;
  fetchDetailsReqStatus: RequestStatus;
}

export function InventoryDetailsCard(props: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const hasContent =
    !!props?.inventoryDetails?.readings.length ||
    !!props?.inventoryDetails?.events.length;

  if (isDesktop) {
    return (
      <Card className={cn("h-fit", props.className)}>
        <CardHeader>
          <CardTitle className={cn("text-center relative", Typography.h3)}>
            Detalhes do inventário
            {props.selectedInventory !== null && (
              <div className="absolute right-0 bottom-1">
                <InventoryStatusBadge status={props.selectedInventory.status} />
              </div>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <InventoryDetailsContent {...props} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Drawer
      open={props.selectedInventory !== null}
      onOpenChange={(open) => {
        if (!open) {
          props.setSelectedInventory(null);
        }
      }}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className={cn("text-center relative", Typography.h3)}>
            Inventário nº {props.selectedInventory?.id}
          </DrawerTitle>
        </DrawerHeader>
        <div className={cn("p-4", !hasContent && "pb-60")}>
          <InventoryDetailsContent {...props} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function InventoryDetailsContent(props: Omit<Props, "className">) {
  return (
    <>
      {!props.hasInventories && (
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

      {props.hasInventories && !props.selectedInventory && (
        <Alert>
          <AlertCircleIcon />
          <AlertTitle>Nenhum inventário selecionado.</AlertTitle>
          <AlertDescription>
            Selecione um inventário na lista ao lado para ver seus detalhes.
          </AlertDescription>
        </Alert>
      )}

      {props.hasInventories && props.selectedInventory && (
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="md:hidden flex items-center gap-1">
              <span className="text-muted-foreground">
                Status do inventário:
              </span>
              {props.selectedInventory !== null && (
                <InventoryStatusBadge status={props.selectedInventory.status} />
              )}
            </p>
            <p className="hidden md:block">
              <span className="text-muted-foreground">
                Inventário selecionado:{" "}
              </span>
              Nº {props.selectedInventory?.id}
            </p>
            <p>
              <span className="text-muted-foreground">
                Funcionário responsável:{" "}
              </span>
              {props.selectedInventory.employeeUsername}
            </p>
          </div>

          {props.fetchDetailsReqStatus === RequestStatus.PENDING && (
            <Alert>
              <Loader className="h-4 w-4 animate-spin" />
              <AlertTitle>Buscando dados no servidor</AlertTitle>
            </Alert>
          )}
          {props.fetchDetailsReqStatus === RequestStatus.ERROR && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Erro ao buscar dados do servidor.</AlertTitle>
              <AlertDescription>
                Por favor, recarregue a página e tente novamente.
              </AlertDescription>
            </Alert>
          )}
          {props.selectedInventory.id === props.inventoryDetails?.id && (
            <div className="space-y-2">
              <Alert>
                <Tag />
                <AlertTitle>
                  {props.inventoryDetails.readings.length === 0
                    ? "Nenhum"
                    : props.inventoryDetails.readings.length}{" "}
                  produto{props.inventoryDetails.readings.length > 1 && "s"}{" "}
                  lido{props.inventoryDetails.readings.length > 1 && "s"} no
                  inventário
                  <span
                    className={cn(
                      "max-sm:hidden",
                      props.selectedInventory.status !== "iniciada" && "hidden",
                    )}
                  >
                    {" "}
                    até o momento
                  </span>
                  .
                </AlertTitle>
              </Alert>
              {/* <Alert>
                <Activity />
                <AlertTitle>
                  {props.inventoryDetails.events.length === 0 && "Nenhum"}
                  {props.inventoryDetails.events.length > 0 &&
                    props.inventoryDetails.events.length}{" "}
                  evento{props.inventoryDetails.events.length > 1 && "s"}{" "}
                  registrado{props.inventoryDetails.events.length > 1 && "s"} no
                  inventário.
                </AlertTitle>
              </Alert> */}
            </div>
          )}
        </div>
      )}
    </>
  );
}
