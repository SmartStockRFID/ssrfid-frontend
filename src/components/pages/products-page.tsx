"use client";

import { getProducts } from "@/api/queries";
import { ProductList } from "@/components/products/product-list";
import { useFetchData } from "@/hooks/use-fetch-data";
import { RequestStatus } from "@/types";
import { ErrorWidget, LoadingWidget } from "./_components";

export default function ProductsPage() {
  const productsReq = useFetchData(getProducts);

  return (
    <main className="max-w-6xl px-2.5 sm:px-6 py-8 mx-auto">
      <div className="md:p-8 md:border rounded-lg bg-card sm:border-border">
        {productsReq.status === RequestStatus.SUCCESS && (
          <ProductList products={productsReq.data ?? []} />
        )}
        {productsReq.status === RequestStatus.PENDING && <LoadingWidget />}
        {productsReq.status === RequestStatus.ERROR && <ErrorWidget />}
      </div>
    </main>
  );
}
