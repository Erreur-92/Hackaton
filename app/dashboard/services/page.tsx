"use client";

import { useState } from "react";
import { mockServices, mockDeliveries } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Plus,
  Building2,
  MapPin,
  Phone,
  Clock,
  Package,
  User,
  Edit,
  Eye,
  TrendingUp,
} from "lucide-react";

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof mockServices[0] | null>(null);

  const filteredServices = mockServices.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDeliveries = mockServices.reduce((acc, s) => acc + s.deliveryCount, 0);
  const avgDeliveriesPerService = Math.round(totalDeliveries / mockServices.length);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestion des services</h1>
          <p className="text-muted-foreground">Services clients internes de l&apos;établissement</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau service
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockServices.length}</p>
              <p className="text-sm text-muted-foreground">Services actifs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
              <Package className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalDeliveries}</p>
              <p className="text-sm text-muted-foreground">Livraisons totales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
              <TrendingUp className="h-6 w-6 text-chart-2" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{avgDeliveriesPerService}</p>
              <p className="text-sm text-muted-foreground">Moy. livraisons/service</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{service.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{service.id}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setSelectedService(service)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{service.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4 shrink-0" />
                <span>{service.responsible}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{service.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>{service.hours}</span>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Livraisons</span>
                  <span className="font-semibold text-foreground">{service.deliveryCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-foreground">Aucun service trouvé</p>
            <p className="text-sm text-muted-foreground">Essayez de modifier votre recherche</p>
          </CardContent>
        </Card>
      )}

      {/* New Service Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Nom du service</Label>
              <Input id="serviceName" placeholder="Cardiologie" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localisation</Label>
              <Input id="location" placeholder="Bâtiment A, Étage 3" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsible">Responsable</Label>
              <Input id="responsible" placeholder="Dr. Martin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" placeholder="01 23 45 67 89" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours">Horaires</Label>
              <Input id="hours" placeholder="24h/24" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Service Detail Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {selectedService.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Service Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">Localisation</p>
                    <p className="font-medium text-foreground">{selectedService.location}</p>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">Responsable</p>
                    <p className="font-medium text-foreground">{selectedService.responsible}</p>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p className="font-medium text-foreground">{selectedService.phone}</p>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">Horaires</p>
                    <p className="font-medium text-foreground">{selectedService.hours}</p>
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <h4 className="mb-3 font-medium text-foreground">Statistiques</h4>
                  <div className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Livraisons totales</span>
                      <span className="text-2xl font-bold text-foreground">{selectedService.deliveryCount}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Deliveries */}
                <div>
                  <h4 className="mb-3 font-medium text-foreground">Dernières livraisons</h4>
                  <div className="space-y-2">
                    {mockDeliveries
                      .filter((d) => d.destinationService.id === selectedService.id)
                      .slice(0, 3)
                      .map((delivery) => (
                        <div
                          key={delivery.id}
                          className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
                        >
                          <div>
                            <p className="font-medium text-foreground">{delivery.id}</p>
                            <p className="text-xs text-muted-foreground">
                              {delivery.products.map((p) => p.productName).join(", ")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-muted-foreground">
                              {new Date(delivery.pickupTime).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                        </div>
                      ))}
                    {mockDeliveries.filter((d) => d.destinationService.id === selectedService.id).length === 0 && (
                      <p className="text-sm text-muted-foreground">Aucune livraison récente</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
