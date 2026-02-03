"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  QrCode,
  Package,
  ArrowRight,
  Clock,
  MapPin,
  User,
  Thermometer,
  FileText,
  AlertTriangle,
  CheckCircle,
  Truck,
  Building2,
  Pill,
  History,
  Scan,
  Download,
} from "lucide-react";

// Product tracking data
const productHistory = [
  {
    id: "h1",
    timestamp: "2024-01-16 14:32",
    action: "Administration",
    location: "Chambre 301 - Cardiologie",
    user: "Sophie Durand (Infirmière)",
    details: "Administration au patient André Rousseau",
    temperature: null,
  },
  {
    id: "h2",
    timestamp: "2024-01-16 14:15",
    action: "Livraison",
    location: "Service Cardiologie",
    user: "Jean Petit (Coursier)",
    details: "Réception confirmée par signature électronique",
    temperature: "4.2°C",
  },
  {
    id: "h3",
    timestamp: "2024-01-16 14:00",
    action: "Départ livraison",
    location: "Pharmacie Centrale",
    user: "Jean Petit (Coursier)",
    details: "Mise en transport réfrigéré",
    temperature: "4.1°C",
  },
  {
    id: "h4",
    timestamp: "2024-01-16 13:45",
    action: "Préparation",
    location: "Pharmacie Centrale",
    user: "Anne Leroy (Préparateur)",
    details: "Préparation commande #CMD-2024-156",
    temperature: "4.0°C",
  },
  {
    id: "h5",
    timestamp: "2024-01-16 09:00",
    action: "Stockage",
    location: "Pharmacie Centrale - Zone A2",
    user: "Système",
    details: "Température contrôlée automatiquement",
    temperature: "4.2°C",
  },
  {
    id: "h6",
    timestamp: "2024-01-15 16:30",
    action: "Réception",
    location: "Pharmacie Centrale",
    user: "Dr. Martin (Pharmacien)",
    details: "Réception fournisseur PharmaDistrib - BL#45621",
    temperature: "3.8°C",
  },
  {
    id: "h7",
    timestamp: "2024-01-15 08:00",
    action: "Expédition fournisseur",
    location: "PharmaDistrib - Entrepôt Paris",
    user: "Fournisseur",
    details: "Départ entrepôt - Transport certifié GDP",
    temperature: "4.0°C",
  },
];

// Batch tracking
const batchInfo = {
  batchNumber: "LOT-2024-78452",
  product: "Insuline Lantus 100UI/ml",
  manufacturer: "Sanofi-Aventis",
  manufacturingDate: "2023-10-15",
  expirationDate: "2025-10-15",
  totalUnits: 500,
  distributed: 320,
  remaining: 180,
  status: "active",
  gtin: "03400930012345",
  serialNumbers: ["SN001", "SN002", "SN003", "..."],
};

// Recent scans
const recentScans = [
  { id: "s1", code: "LOT-2024-78452", product: "Insuline Lantus", time: "Il y a 5 min", user: "Sophie Durand", type: "Administration" },
  { id: "s2", code: "LOT-2024-45123", product: "Paracétamol 500mg", time: "Il y a 12 min", user: "Jean Petit", type: "Livraison" },
  { id: "s3", code: "LOT-2024-89741", product: "Amoxicilline 1g", time: "Il y a 25 min", user: "Anne Leroy", type: "Préparation" },
  { id: "s4", code: "LOT-2024-32156", product: "Morphine 10mg", time: "Il y a 45 min", user: "Dr. Martin", type: "Contrôle" },
];

// Recall alerts
const recallAlerts = [
  {
    id: "r1",
    date: "2024-01-14",
    product: "Metformine 850mg",
    batch: "LOT-2023-45678",
    reason: "Défaut de conditionnement détecté",
    severity: "high",
    status: "active",
    affectedUnits: 50,
    retrieved: 45,
  },
  {
    id: "r2",
    date: "2024-01-10",
    product: "Aspirine 100mg",
    batch: "LOT-2023-78912",
    reason: "Rappel fabricant - Traces impuretés",
    severity: "medium",
    status: "completed",
    affectedUnits: 200,
    retrieved: 200,
  },
];

export default function TraceabilityPage() {
  const [searchCode, setSearchCode] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<typeof batchInfo | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const handleSearch = () => {
    if (searchCode) {
      setSelectedBatch(batchInfo);
      setShowHistory(true);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "Administration":
        return <Pill className="h-4 w-4 text-green-500" />;
      case "Livraison":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "Départ livraison":
        return <ArrowRight className="h-4 w-4 text-primary" />;
      case "Préparation":
        return <Package className="h-4 w-4 text-amber-500" />;
      case "Stockage":
        return <Building2 className="h-4 w-4 text-gray-500" />;
      case "Réception":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Traçabilité Complète</h1>
          <p className="text-muted-foreground">
            Suivi du circuit complet des médicaments - De la réception à l'administration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Scan className="mr-2 h-4 w-4" />
            Scanner
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recherche par Code</CardTitle>
          <CardDescription>
            Entrez un numéro de lot, code-barres, GTIN ou numéro de série
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <QrCode className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="LOT-2024-XXXXX, GTIN, ou numéro de série..."
                className="pl-10"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Rechercher
            </Button>
          </div>

          {/* Recent Scans */}
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Scans Récents</h4>
            <div className="flex flex-wrap gap-2">
              {recentScans.map((scan) => (
                <Button
                  key={scan.id}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchCode(scan.code);
                    setSelectedBatch(batchInfo);
                    setShowHistory(true);
                  }}
                >
                  <QrCode className="mr-2 h-3 w-3" />
                  {scan.code}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tracking" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tracking">Suivi en Temps Réel</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="recalls">Rappels de Lots</TabsTrigger>
        </TabsList>

        <TabsContent value="tracking" className="space-y-4">
          {showHistory && selectedBatch ? (
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Batch Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Informations du Lot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Numéro de lot</p>
                    <p className="font-mono font-medium">{selectedBatch.batchNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Produit</p>
                    <p className="font-medium">{selectedBatch.product}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Fabricant</p>
                    <p>{selectedBatch.manufacturer}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Fabrication</p>
                      <p>{selectedBatch.manufacturingDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Expiration</p>
                      <p>{selectedBatch.expirationDate}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">GTIN</p>
                    <p className="font-mono text-sm">{selectedBatch.gtin}</p>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Total unités</span>
                      <span className="font-medium">{selectedBatch.totalUnits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Distribuées</span>
                      <span className="font-medium text-green-600">{selectedBatch.distributed}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Restantes</span>
                      <span className="font-medium text-primary">{selectedBatch.remaining}</span>
                    </div>
                  </div>
                  <Badge className="w-full justify-center bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Lot Actif - Conforme
                  </Badge>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Historique du Circuit</CardTitle>
                  <CardDescription>Traçabilité complète du lot</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="relative">
                      <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />
                      <div className="space-y-6">
                        {productHistory.map((event, index) => (
                          <div key={event.id} className="relative flex gap-4">
                            <div className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background ${
                              index === 0 ? "border-green-500 bg-green-50" : "border-muted"
                            }`}>
                              {getActionIcon(event.action)}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">{event.action}</p>
                                  <p className="text-sm text-muted-foreground">{event.details}</p>
                                </div>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {event.timestamp}
                                </span>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-xs">
                                  <MapPin className="mr-1 h-3 w-3" />
                                  {event.location}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  <User className="mr-1 h-3 w-3" />
                                  {event.user}
                                </Badge>
                                {event.temperature && (
                                  <Badge variant="outline" className="text-xs">
                                    <Thermometer className="mr-1 h-3 w-3" />
                                    {event.temperature}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <QrCode className="h-16 w-16 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium">Aucun produit sélectionné</p>
                <p className="text-sm text-muted-foreground">
                  Recherchez un code lot ou scannez un code-barres pour voir la traçabilité
                </p>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activité Récente</CardTitle>
              <CardDescription>Derniers scans et mouvements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Temps</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentScans.map((scan) => (
                    <TableRow key={scan.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-mono">{scan.code}</TableCell>
                      <TableCell>{scan.product}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{scan.type}</Badge>
                      </TableCell>
                      <TableCell>{scan.user}</TableCell>
                      <TableCell className="text-muted-foreground">{scan.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Journal de Traçabilité</CardTitle>
              <CardDescription>Historique complet des mouvements de médicaments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input placeholder="Filtrer par produit, lot, utilisateur..." className="max-w-sm" />
                <Button variant="outline">Filtrer</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date/Heure</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead>Lot</TableHead>
                    <TableHead>Localisation</TableHead>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Détails</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productHistory.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="whitespace-nowrap">{event.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getActionIcon(event.action)}
                          {event.action}
                        </div>
                      </TableCell>
                      <TableCell>Insuline Lantus</TableCell>
                      <TableCell className="font-mono text-sm">LOT-2024-78452</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>{event.user}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recalls" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold text-red-600">1</p>
                    <p className="text-sm text-red-600/80">Rappel actif</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-muted-foreground">Rappels complétés</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <Package className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">98%</p>
                    <p className="text-sm text-muted-foreground">Taux récupération</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Alertes de Rappel de Lots</CardTitle>
              <CardDescription>Gestion des rappels fabricants et incidents qualité</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recallAlerts.map((recall) => (
                  <div
                    key={recall.id}
                    className={`rounded-lg border p-4 ${
                      recall.status === "active" ? "border-red-200 bg-red-50" : "bg-muted/30"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{recall.product}</h4>
                          <Badge variant={recall.status === "active" ? "destructive" : "secondary"}>
                            {recall.status === "active" ? "Actif" : "Complété"}
                          </Badge>
                          <Badge variant={recall.severity === "high" ? "destructive" : "outline"}>
                            {recall.severity === "high" ? "Haute priorité" : "Priorité moyenne"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Lot: <span className="font-mono">{recall.batch}</span>
                        </p>
                        <p className="text-sm mt-2">{recall.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{recall.date}</p>
                        <p className="mt-2 text-sm">
                          <span className="font-medium">{recall.retrieved}</span> / {recall.affectedUnits} récupérés
                        </p>
                      </div>
                    </div>
                    {recall.status === "active" && (
                      <div className="mt-4 flex gap-2">
                        <Button size="sm">Voir les unités affectées</Button>
                        <Button size="sm" variant="outline">
                          Marquer comme récupéré
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
