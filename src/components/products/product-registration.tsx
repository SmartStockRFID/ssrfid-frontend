// low-code: v0 made

"use client";

import { Loader2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CreateProductDTO } from "@/types";
import { type ClassNameProp, cn } from "@/utils";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

export function ProductRegistration({ className }: ClassNameProp) {
  const [formData, setFormData] = useState<CreateProductDTO>({
    nome: "",
    codigo_produto: "",
    descricao: "",
    localizacao: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof CreateProductDTO, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aqui você deve substituir pela URL da sua API
      const response = await fetch("/api/pecas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        toast.success("Produto cadastrado com sucesso!", {
          description: `${newProduct.nome} foi adicionado ao inventário.`,
        });

        setFormData({
          nome: "",
          codigo_produto: "",
          descricao: "",
          localizacao: "",
        });
      } else {
        throw new Error("Erro ao cadastrar produto");
      }
    } catch (_error) {
      toast.error("Erro ao cadastrar produto", {
        description: "Verifique os dados e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(className, "space-y-6")}>
      <DialogHeader className="flex items-center space-x-3">
        <div>
          <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Cadastrar Novo Produto
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-200">
            Preencha as informações do produto para adicionar ao sistema
          </DialogDescription>
        </div>
      </DialogHeader>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Informações do Produto</CardTitle>
          <CardDescription>Preencha os dados do novo produto</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-sm font-medium">
                Nome do Produto *
              </Label>
              <Input
                id="nome"
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                placeholder="Ex: Parafuso M8x20"
                required
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codigo_produto" className="text-sm font-medium">
                Código do Produto *
              </Label>
              <Input
                id="codigo_produto"
                type="text"
                value={formData.codigo_produto}
                onChange={(e) =>
                  handleInputChange("codigo_produto", e.target.value)
                }
                placeholder="Ex: PAR-M8-20"
                required
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao" className="text-sm font-medium">
                Descrição *
              </Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => handleInputChange("descricao", e.target.value)}
                placeholder="Descreva as características do produto..."
                required
                className="bg-input border-border min-h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="localizacao" className="text-sm font-medium">
                Localização *
              </Label>
              <Input
                id="localizacao"
                type="text"
                value={formData.localizacao}
                onChange={(e) =>
                  handleInputChange("localizacao", e.target.value)
                }
                placeholder="Ex: Estoque A - Prateleira 3"
                required
                className="bg-input border-border"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Cadastrando...
                </>
              ) : (
                "Cadastrar Produto"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
