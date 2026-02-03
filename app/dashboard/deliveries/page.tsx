"use client";

import { useState } from "react";
import { mockDeliveries } from "@/lib/mock-data";
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
  Search,
  Filter,
  Plus,
  Eye,
  ThermometerSun,
  Clock,
  Package,
  User,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DeliveryStatus = "all" | "pending" | "in_preparation" | "in_transit" | "delivered" | "incident";

export default function DeliveriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus>("all");
  const [selectedDelivery, setSelectedDelivery] = useState<typeof mockDeliveries[0] | null>(null);

  const filteredDeliveries = mockDeliveries.filter((delivery) => {
    const matchesSearch =
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.destinationService.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.courier.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Livraisons</h1>
          <p className="text-muted-foreground">Suivi et gestion des livraisons</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle livraison
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par ID, service, coursier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as DeliveryStatus)}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="in_preparation">En préparation</SelectItem>
                <SelectItem value="in_transit">En livraison</SelectItem>
                <SelectItem value="delivered">Livré</SelectItem>
                <SelectItem value="incident">Incident</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Deliveries List */}
      <div className="grid gap-4">
        {filteredDeliveries.map((delivery) => (
          <Card key={delivery.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Main Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-foreground">{delivery.id}</span>
                    <StatusBadge status={delivery.urgency} type="urgency" />
                    <StatusBadge status={delivery.status} type="delivery" />
                  </div>
                  
                  <div className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="truncate">{delivery.destinationService.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4 shrink-0" />
                      <span className="truncate">{delivery.courier.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Package className="h-4 w-4 shrink-0" />
                      <span>{delivery.packageCount} colis</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>
                        {new Date(delivery.pickupTime).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Produits : </span>
                    {delivery.products.map((p) => `${p.productName} (x${p.quantity})`).join(", ")}
                  </div>

                  {/* Temperature */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <ThermometerSun className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Prise : </span>
                      <span className="font-medium text-foreground">{delivery.temperaturePickup}°C</span>
                    </div>
                    {delivery.temperatureDelivery !== null && (
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Livraison : </span>
                        <span className={`font-medium ${
                          Math.abs(delivery.temperatureDelivery - delivery.temperaturePickup) > 3
                            ? "text-destructive"
                            : "text-foreground"
                        }`}>
                          {delivery.temperatureDelivery}°C
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Incident reason if any */}
                  {delivery.incidentReason && (
                    <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                      {delivery.incidentReason}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 lg:flex-col">
                  <Button variant="outline" size="sm" onClick={() => setSelectedDelivery(delivery)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Détails
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredDeliveries.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-lg font-medium text-foreground">Aucune livraison trouvée</p>
              <p className="text-sm text-muted-foreground">Essayez de modifier vos filtres</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delivery Detail Dialog */}
      <Dialog open={!!selectedDelivery} onOpenChange={() => setSelectedDelivery(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedDelivery && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedDelivery.id}
                  <StatusBadge status={selectedDelivery.status} type="delivery" />
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Status Timeline */}
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Informations de livraison</h4>
                  <div className="grid gap-3 rounded-lg border border-border p-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service destinataire</span>
                      <span className="font-medium text-foreground">{selectedDelivery.destinationService.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Localisation</span>
                      <span className="font-medium text-foreground">{selectedDelivery.destinationService.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coursier</span>
                      <span className="font-medium text-foreground">{selectedDelivery.courier.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Heure de prise en charge</span>
                      <span className="font-medium text-foreground">
                        {new Date(selectedDelivery.pickupTime).toLocaleString("fr-FR")}
                      </span>
                    </div>
                    {selectedDelivery.deliveryTime && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Heure de livraison</span>
                        <span className="font-medium text-foreground">
                          {new Date(selectedDelivery.deliveryTime).toLocaleString("fr-FR")}
                        </span>
                      </div>
                    )}
                    {selectedDelivery.recipient && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Réceptionnaire</span>
                        <span className="font-medium text-foreground">
                          {selectedDelivery.recipient} ({selectedDelivery.recipientRole})
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Signature</span>
                      <span className="font-medium text-foreground">
                        {selectedDelivery.signature ? "Oui" : "Non"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Temperature */}
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Suivi de température</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-border p-4">
                      <p className="text-sm text-muted-foreground">Température à la prise en charge</p>
                      <p className="text-2xl font-bold text-foreground">{selectedDelivery.temperaturePickup}°C</p>
                    </div>
                    <div className="rounded-lg border border-border p-4">
                      <p className="text-sm text-muted-foreground">Température à la livraison</p>
                      <p className={`text-2xl font-bold ${
                        selectedDelivery.temperatureDelivery !== null &&
                        Math.abs(selectedDelivery.temperatureDelivery - selectedDelivery.temperaturePickup) > 3
                          ? "text-destructive"
                          : "text-foreground"
                      }`}>
                        {selectedDelivery.temperatureDelivery !== null
                          ? `${selectedDelivery.temperatureDelivery}°C`
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Produits ({selectedDelivery.packageCount} colis)</h4>
                  <div className="rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="px-4 py-2 text-left font-medium text-muted-foreground">Produit</th>
                          <th className="px-4 py-2 text-right font-medium text-muted-foreground">Quantité</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDelivery.products.map((product, index) => (
                          <tr key={index} className="border-b border-border last:border-0">
                            <td className="px-4 py-3 text-foreground">{product.productName}</td>
                            <td className="px-4 py-3 text-right text-foreground">{product.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Incident */}
                {selectedDelivery.incidentReason && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-destructive">Incident signalé</h4>
                    <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
                      {selectedDelivery.incidentReason}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
