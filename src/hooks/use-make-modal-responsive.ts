import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "./use-media-query";

interface ResponsiveModalComponents {
  Root: typeof Dialog | typeof Drawer;
  Trigger: typeof DialogTrigger | typeof DrawerTrigger;
  Header: typeof DialogHeader | typeof DrawerHeader;
  Title: typeof DialogTitle | typeof DrawerTitle;
  Content: typeof DialogContent | typeof DrawerContent;
  Footer: typeof DialogFooter | typeof DrawerFooter;
}

export function useMakeModalResponsive(): ResponsiveModalComponents {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const componentSet = isDesktop
    ? {
        Root: Dialog,
        Trigger: DialogTrigger,
        Header: DialogHeader,
        Title: DialogTitle,
        Content: DialogContent,
        Footer: DialogFooter,
      }
    : {
        Root: Drawer,
        Trigger: DrawerTrigger,
        Header: DrawerHeader,
        Title: DrawerTitle,
        Content: DrawerContent,
        Footer: DrawerFooter,
      };

  return componentSet;
}
