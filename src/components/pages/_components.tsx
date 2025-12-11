import { Loader } from "lucide-react";
import { Alert, AlertTitle } from "../ui/alert";

export const ErrorWidget = () => (
  <Alert>
    <Loader className="h-4 w-4 animate-spin" />
    <AlertTitle>Buscando dados no servidor</AlertTitle>
  </Alert>
);

export const LoadingWidget = () => (
  <Alert>
    <Loader className="h-4 w-4 animate-spin" />
    <AlertTitle>Buscando dados no servidor</AlertTitle>
  </Alert>
);
