"use client";

import { useState } from "react";
import { mockDeliveryRequests, mockProducts, mockServices, mockUsers } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Building,
  Package,
  AlertTriangle,
} from "lucide-react";

type RequestStatus = "all" | "pending" | "approved" | "in_preparation" | "in_transit" | "delivered" | "rejected";

export default function RequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus>("all");
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<typeof mockDeliveryRequests[0] | null>(null);

  const filteredRequests = mockDeliveryRequests.filter((request) => {
    const matchesSearch =
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestingService.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = mockDeliveryRequests.filter((r) => r.status === "pending").length;
  const approvedCount = mockDeliveryRequests.filter((r) => r.status === "approved" || r.status === "in_preparation").length;
  const deliveredCount = mockDeliveryRequests.filter((r) => r.status === "delivered").length;

  const couriers = mockUsers.filter((u) => u.role === "coursier");

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Demandes de livraison</h1>
          <p className="text-muted-foreground">Gestion des demandes des services</p>
        </div>
        <Button onClick={() => setIsNewRequestOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle demande
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
              <Clock className="h-6 w-6 text-warning-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">En attente</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <ClipboardList className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{approvedCount}</p>
              <p className="text-sm text-muted-foreground">En cours</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{deliveredCount}</p>
              <p className="text-sm text-muted-foreground">Livrées</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par ID ou service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as RequestStatus)}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="approved">Validée</SelectItem>
                <SelectItem value="in_preparation">En préparation</SelectItem>
                <SelectItem value="in_transit">En livraison</SelectItem>
                <SelectItem value="delivered">Livrée</SelectItem>
                <SelectItem value="rejected">Rejetée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-foreground">{request.id}</span>
                    <StatusBadge status={request.urgency} type="urgency" />
                    <StatusBadge status={request.status} type="request" />
                  </div>

                  {/* Details */}
                  <div className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building className="h-4 w-4 shrink-0" />
                      <span>{request.requestingService.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4 shrink-0" />
                      <span>{request.requestedBy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>
                        {new Date(request.requestedAt).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Produits : </span>
                    <span className="text-muted-foreground">
                      {request.products.map((p) => `${p.productName} (x${p.quantity})`).join(", ")}
                    </span>
                  </div>

                  {/* Assigned Courier */}
                  {request.assignedCourier && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Coursier assigné :</span>
                      <span className="font-medium text-foreground">{request.assignedCourier.name}</span>
                    </div>
                  )}

                  {/* Notes */}
                  {request.notes && (
                    <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                      {request.notes}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 lg:flex-col">
                  {request.status === "pending" && (
                    <>
                      <Button size="sm" variant="default">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Valider
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive hover:text-destructive bg-transparent">
                        <XCircle className="mr-2 h-4 w-4" />
                        Rejeter
                      </Button>
                    </>
                  )}
                  {request.status === "approved" && (
                    <Button size="sm" variant="default">
                      <Package className="mr-2 h-4 w-4" />
                      Préparer
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredRequests.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ClipboardList className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-lg font-medium text-foreground">Aucune demande trouvée</p>
              <p className="text-sm text-muted-foreground">Essayez de modifier vos filtres</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* New Request Dialog */}
      <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nouvelle demande de livraison</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Service demandeur</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un service" />
                </SelectTrigger>
                <SelectContent>
                  {mockServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Produit</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un produit" />
                </SelectTrigger>
                <SelectContent>
                  {mockProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quantité</Label>
              <Input type="number" placeholder="10" />
            </div>
            <div className="space-y-2">
              <Label>Niveau d&apos;urgence</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="critical">Critique</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notes (optionnel)</Label>
              <Textarea placeholder="Informations complémentaires..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => setIsNewRequestOpen(false)}>
              Créer la demande
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
