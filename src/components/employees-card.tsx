import { AlertCircleIcon, UserCircle } from "lucide-react";
import type { Employee } from "@/types";
import { type ClassNameProp, cn } from "@/utils";
import { Alert, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Typography } from "./ui/typography";

export function EmployeesCard({
  emplooyees,
  className,
}: { emplooyees: Employee[] } & ClassNameProp) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className={cn("text-center", Typography.h3)}>
          Funcionários operadores
        </CardTitle>
      </CardHeader>
      <CardContent>
        {emplooyees.length > 0 ? (
          <ul className="space-y-3">
            {emplooyees.map((e) => (
              <li
                key={e.username}
                className="flex items-center justify-between p-3 bg-gray-100 border rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <UserCircle />
                  <p className="flex flex-col">
                    <span className="text-sm font-semibold">Funcionário</span>
                    <span>{e.username}</span>
                  </p>
                </div>
                <Button disabled variant="destructive">
                  Desativar Acesso
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <Alert>
            <AlertCircleIcon />
            <AlertTitle>
              Nenhum funcionário cadastrado até o momento.
            </AlertTitle>
          </Alert>
        )}
      </CardContent>

      {/* <CardFooter>
        <EmployeeFormModal>
          <Button className="w-full">Adicionar funcionário</Button>
        </EmployeeFormModal>
      </CardFooter> */}
    </Card>
  );
}
