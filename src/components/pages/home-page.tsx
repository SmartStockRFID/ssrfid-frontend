"use client";

import { getEmployees, getInventories } from "@/api/queries";
import { useFetchData } from "@/hooks/use-fetch-data";
import { RequestStatus } from "@/types";
import { cn } from "@/utils";
import { EmployeeForm } from "../employee-registration";
import { EmployeesCard } from "../employees-card";
import { InventoriesCards } from "../inventories-cards/inventories-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ErrorWidget, LoadingWidget } from "./_components";

const PageTabs = {
  inventories: "Inventários",
  employees: "Funcionários",
};

export default function HomePage() {
  const inventoriesReq = useFetchData(getInventories);
  const employeesReq = useFetchData(getEmployees);

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto max-sm:px-1 flex flex-col sm:flex-row pt-8 gap-8 *:gap-4 pb-2">
      <Tabs defaultValue={PageTabs.inventories} className="items-center w-full">
        <TabsList className="w-full max-w-2xl border-2">
          <TabsTrigger
            value={PageTabs.inventories}
            disabled={inventoriesReq.status !== RequestStatus.SUCCESS}
          >
            {PageTabs.inventories}
          </TabsTrigger>
          <TabsTrigger
            value={PageTabs.employees}
            disabled={employeesReq.status !== RequestStatus.SUCCESS}
          >
            {PageTabs.employees}
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value={PageTabs.inventories}
          className={cn(
            inventoriesReq.status === RequestStatus.SUCCESS &&
              "flex w-full gap-4",
          )}
        >
          {inventoriesReq.status === RequestStatus.PENDING && <LoadingWidget />}
          {inventoriesReq.status === RequestStatus.ERROR && <ErrorWidget />}
          {inventoriesReq.status === RequestStatus.SUCCESS && (
            <InventoriesCards inventories={inventoriesReq.data ?? []} />
          )}
        </TabsContent>
        <TabsContent value={PageTabs.employees} className="flex w-full gap-4">
          {employeesReq.status === RequestStatus.PENDING && <LoadingWidget />}
          {employeesReq.status === RequestStatus.ERROR && <ErrorWidget />}
          {employeesReq.status === RequestStatus.SUCCESS && (
            <EmployeesCard
              emplooyees={employeesReq.data ?? []}
              className="w-full sm:1/2"
            />
          )}
          <EmployeeForm className="hidden sm:block sm:w-1/2 h-fit" />
        </TabsContent>
      </Tabs>
    </main>
  );
}
