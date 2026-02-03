"use client";

import { useState } from "react";
import { mockProducts, stockChartData } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  Filter,
  Plus,
  Package,
  AlertTriangle,
  TrendingDown,
  ArrowUpDown,
  Edit,
  History,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

type ProductType = "all" | "medicament" | "dispositif_medical" | "produit_sensible";
type StockStatus = "all" | "normal" | "low" | "critical";

const productTypeLabels: Record<string, string> = {
  medicament: "Médicament",
  dispositif_medical: "Dispositif médical",
  produit_sensible: "Produit sensible",
};

export default function StocksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<ProductType>("all");
  const [statusFilter, setStatusFilter] = useState<StockStatus>("all");
  const [adjustmentDialog, setAdjustmentDialog] = useState<typeof mockProducts[0] | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<"add" | "remove">("add");
  const [adjustmentQuantity, setAdjustmentQuantity] = useState("");

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.lotNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || product.type === typeFilter;
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const criticalCount = mockProducts.filter((p) => p.status === "critical").length;
  const lowCount = mockProducts.filter((p) => p.status === "low").length;
  const totalProducts = mockProducts.length;

  const getBarColor = (entry: { current: number; min: number; critical: number }) => {
    if (entry.current <= entry.critical) return "hsl(var(--destructive))";
    if (entry.current <= entry.min) return "hsl(var(--warning))";
    return "hsl(var(--success))";
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestion des stocks</h1>
          <p className="text-muted-foreground">Suivi et gestion des produits de santé</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau produit
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalProducts}</p>
              <p className="text-sm text-muted-foreground">Produits référencés</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
              <TrendingDown className="h-6 w-6 text-warning-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{lowCount}</p>
              <p className="text-sm text-muted-foreground">Stocks faibles</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{criticalCount}</p>
              <p className="text-sm text-muted-foreground">Stocks critiques</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Niveaux de stock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number, name: string) => {
                    const labels: Record<string, string> = {
                      current: "Stock actuel",
                      min: "Seuil minimum",
                      critical: "Seuil critique",
                    };
                    return [value, labels[name] || name];
                  }}
                />
                <Legend
                  formatter={(value: string) => {
                    const labels: Record<string, string> = {
                      current: "Stock actuel",
                      min: "Seuil minimum",
                      critical: "Seuil critique",
                    };
                    return labels[value] || value;
                  }}
                />
                <Bar dataKey="current" name="current" radius={[0, 4, 4, 0]}>
                  {stockChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou numéro de lot..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as ProductType)}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="medicament">Médicament</SelectItem>
                <SelectItem value="dispositif_medical">Dispositif médical</SelectItem>
                <SelectItem value="produit_sensible">Produit sensible</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StockStatus)}>
              <SelectTrigger className="w-full sm:w-48">
                <AlertTriangle className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Faible</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Produit</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Lot</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Expiration</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                    <div className="flex items-center justify-end gap-1">
                      Quantité
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Statut</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {productTypeLabels[product.type]}
                    </td>
                    <td className="px-4 py-4 text-sm font-mono text-foreground">{product.lotNumber}</td>
                    <td className="px-4 py-4 text-sm text-foreground">
                      {new Date(product.expirationDate).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div>
                        <p className="font-semibold text-foreground">
                          {product.quantity} {product.unit}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Min: {product.minThreshold} / Crit: {product.criticalThreshold}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={product.status} type="stock" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setAdjustmentDialog(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <History className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Stock Adjustment Dialog */}
      <Dialog open={!!adjustmentDialog} onOpenChange={() => setAdjustmentDialog(null)}>
        <DialogContent>
          {adjustmentDialog && (
            <>
              <DialogHeader>
                <DialogTitle>Ajustement de stock</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="rounded-lg border border-border p-4">
                  <p className="font-medium text-foreground">{adjustmentDialog.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Stock actuel : {adjustmentDialog.quantity} {adjustmentDialog.unit}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Type d&apos;ajustement</Label>
                  <Select value={adjustmentType} onValueChange={(v) => setAdjustmentType(v as "add" | "remove")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Entrée (réception)</SelectItem>
                      <SelectItem value="remove">Sortie (consommation)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quantité</Label>
                  <Input
                    type="number"
                    value={adjustmentQuantity}
                    onChange={(e) => setAdjustmentQuantity(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAdjustmentDialog(null)}>
                  Annuler
                </Button>
                <Button onClick={() => setAdjustmentDialog(null)}>
                  Enregistrer
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
