"use server";

import type { ApplicationException } from "@/exceptions";
import type {
  GetAllInventoryDTO,
  GetByIdInventoryDTO,
  GetProductDTO,
  InventoryDetails,
  InventorySummary,
  Product,
} from "@/types";
import { apiClient } from "./api-client";

export async function getProducts(): Promise<Product[] | ApplicationException> {
  const endpoint = "/pecas/";
  const res = await apiClient(endpoint);

  if (!(res instanceof Response)) {
    return res;
  }

  const body: GetProductDTO[] = await res.json();

  const parse = (p: GetProductDTO): Product => {
    return {
      id: p.id,
      name: p.nome,
      description: p.descricao,
      location: p.localizacao,
      productCode: p.codigo_produto,
    };
  };

  return body.map(parse);
}

export async function getInventories(): Promise<
  InventorySummary[] | ApplicationException
> {
  const endpoint = "/conferencia/";
  const res = await apiClient(endpoint);

  if (!(res instanceof Response)) {
    return res;
  }

  const body: GetAllInventoryDTO[] = await res.json();

  const parse = (i: GetAllInventoryDTO): InventorySummary => {
    return {
      id: i.id,
      status: i.status,
      employeeUsername: i.username_funcionario,
    };
  };

  return body.map(parse).toReversed();
}

export async function getInventoryDetails(
  id: number,
): Promise<InventoryDetails | ApplicationException> {
  const endpoint = `/conferencia/${id}`;
  const res = await apiClient(endpoint);

  if (!(res instanceof Response)) {
    return res;
  }

  const body: GetByIdInventoryDTO = await res.json();

  const parsed: InventoryDetails = {
    id: body.id,
    status: body.status,
    employeeUsername: body.username_funcionario,
    events: body.eventos.map((event) => ({
      id: event.id,
      description: event.descricao,
      occurredAt: new Date(event.ocorreu_em),
      type: event.tipo,
    })),
    readings: body.leituras.map((reading) => ({
      id: reading.id,
      productCode: reading.codigo_produto,
      quantity: reading.quantidade,
      lastReadTimestamp: new Date(reading.ultima_leitura),
    })),
  };

  return parsed;
}
