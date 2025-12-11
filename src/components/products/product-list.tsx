// low-code: v0 made

"use client";

import { MapPin, Package2, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "@/types";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ProductRegistration } from "./product-registration";

export function ProductList({ products }: { products: Product[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productCode.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Package2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
              Produtos <span className="hidden sm:inline">Cadastrados</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-200 hidden sm:block">
              Lista de produtos no inventário RFID
            </p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Adicionar</Button>
          </DialogTrigger>
          <DialogContent>
            <ProductRegistration />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-medium">
              Buscar produtos
            </Label>
            <div className="relative">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                id="search"
                type="text"
                placeholder="Buscar por nome ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              {searchTerm
                ? "Nenhum produto encontrado"
                : "Nenhum produto cadastrado"}
            </div>
          ) : (
            <div className="space-y-4 overflow-y-auto max-h-96">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border rounded-lg border-border bg-muted/30"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-card-foreground">
                      {product.name}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-secondary text-secondary-foreground"
                    >
                      {product.productCode}
                    </Badge>
                  </div>

                  <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {product.location}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
