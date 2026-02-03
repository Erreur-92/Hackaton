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
import { Label } from "@/components/ui/label";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Plus,
  Building2,
  Phone,
  Mail,
  MapPin,
  Star,
  TrendingUp,
  TrendingDown,
  Package,
  Clock,
  Euro,
  FileText,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Suppliers data
const suppliers = [
  {
    id: "sup1",
    name: "PharmaDistrib SA",
    type: "Grossiste",
    contact: "Jean-Pierre Martin",
    email: "contact@pharmadistrib.fr",
    phone: "+33 1 42 56 78 90",
    address: "45 Rue de la Santé, 75013 Paris",
    rating: 4.8,
    status: "active",
    totalOrders: 245,
    onTimeDelivery: 98,
    avgDeliveryDays: 1.2,
    lastOrder: "2024-01-15",
    products: 156,
    monthlyVolume: 45000,
    contract: "2024-12-31",
  },
  {
    id: "sup2",
    name: "MediSupply Europe",
    type: "Fabricant",
    contact: "Sophie Durand",
    email: "orders@medisupply.eu",
    phone: "+33 4 91 23 45 67",
    address: "12 Avenue des Laboratoires, 69003 Lyon",
    rating: 4.5,
    status: "active",
    totalOrders: 189,
    onTimeDelivery: 94,
    avgDeliveryDays: 2.5,
    lastOrder: "2024-01-14",
    products: 89,
    monthlyVolume: 32000,
    contract: "2025-06-30",
  },
  {
    id: "sup3",
    name: "BioPharm International",
    type: "Importateur",
    contact: "Marc Leblanc",
    email: "sales@biopharm.com",
    phone: "+33 3 88 12 34 56",
    address: "8 Rue de l'Innovation, 67000 Strasbourg",
    rating: 4.2,
    status: "active",
    totalOrders: 78,
    onTimeDelivery: 91,
    avgDeliveryDays: 4.0,
    lastOrder: "2024-01-10",
    products: 45,
    monthlyVolume: 18000,
    contract: "2024-09-15",
  },
  {
    id: "sup4",
    name: "EquipMed France",
    type: "Équipements",
    contact: "Claire Petit",
    email: "info@equipmed.fr",
    phone: "+33 2 40 56 78 90",
    address: "23 Boulevard Médical, 44000 Nantes",
    rating: 4.6,
    status: "active",
    totalOrders: 56,
    onTimeDelivery: 96,
    avgDeliveryDays: 3.0,
    lastOrder: "2024-01-08",
    products: 234,
    monthlyVolume: 28000,
    contract: "2025-03-31",
  },
  {
    id: "sup5",
    name: "ChemLab Solutions",
    type: "Réactifs",
    contact: "Paul Richard",
    email: "orders@chemlab.fr",
    phone: "+33 5 56 12 34 56",
    address: "67 Rue des Sciences, 33000 Bordeaux",
    rating: 3.9,
    status: "warning",
    totalOrders: 34,
    onTimeDelivery: 85,
    avgDeliveryDays: 5.5,
    lastOrder: "2024-01-05",
    products: 67,
    monthlyVolume: 12000,
    contract: "2024-06-30",
  },
];

// Orders history
const recentOrders = [
  { id: "ORD-2024-156", supplier: "PharmaDistrib SA", date: "2024-01-15", amount: 4520, status: "delivered", items: 45 },
  { id: "ORD-2024-155", supplier: "MediSupply Europe", date: "2024-01-14", amount: 8900, status: "in-transit", items: 23 },
  { id: "ORD-2024-154", supplier: "PharmaDistrib SA", date: "2024-01-13", amount: 2340, status: "delivered", items: 18 },
  { id: "ORD-2024-153", supplier: "BioPharm International", date: "2024-01-10", amount: 12500, status: "delivered", items: 12 },
  { id: "ORD-2024-152", supplier: "EquipMed France", date: "2024-01-08", amount: 6780, status: "delivered", items: 8 },
  { id: "ORD-2024-151", supplier: "ChemLab Solutions", date: "2024-01-05", amount: 3200, status: "delayed", items: 15 },
];

// Pending orders suggestions
const orderSuggestions = [
  { product: "Paracétamol 500mg", currentStock: 450, minStock: 500, supplier: "PharmaDistrib SA", suggestedQty: 200, urgency: "high" },
  { product: "Morphine 10mg", currentStock: 85, minStock: 100, supplier: "MediSupply Europe", suggestedQty: 50, urgency: "medium" },
  { product: "Amoxicilline 1g", currentStock: 280, minStock: 300, supplier: "PharmaDistrib SA", suggestedQty: 100, urgency: "low" },
  { product: "Héparine 5000UI", currentStock: 120, minStock: 150, supplier: "BioPharm International", suggestedQty: 80, urgency: "medium" },
];

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<typeof suppliers[0] | null>(null);

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Livré</Badge>;
      case "in-transit":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En transit</Badge>;
      case "delayed":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Retardé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <Badge variant="destructive">Urgent</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Moyen</Badge>;
      default:
        return <Badge variant="secondary">Faible</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestion des Fournisseurs</h1>
          <p className="text-muted-foreground">
            Gestion des fournisseurs, commandes et contrats
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isOrderOpen} onOpenChange={setIsOrderOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Package className="mr-2 h-4 w-4" />
                Nouvelle Commande
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer une Commande</DialogTitle>
                <DialogDescription>
                  Passez une nouvelle commande auprès d'un fournisseur
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Fournisseur</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un fournisseur" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Produit</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="p1">Paracétamol 500mg</SelectItem>
                        <SelectItem value="p2">Morphine 10mg</SelectItem>
                        <SelectItem value="p3">Amoxicilline 1g</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Quantité</Label>
                    <Input type="number" placeholder="100" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Date de livraison souhaitée</Label>
                  <Input type="date" />
                </div>
                <div className="grid gap-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Instructions spéciales..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOrderOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setIsOrderOpen(false)}>Passer la commande</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddSupplierOpen} onOpenChange={setIsAddSupplierOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter Fournisseur
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nouveau Fournisseur</DialogTitle>
                <DialogDescription>
                  Ajoutez un nouveau fournisseur au système
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Nom de l'entreprise</Label>
                  <Input placeholder="Nom du fournisseur" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grossiste">Grossiste</SelectItem>
                        <SelectItem value="fabricant">Fabricant</SelectItem>
                        <SelectItem value="importateur">Importateur</SelectItem>
                        <SelectItem value="equipements">Équipements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Contact principal</Label>
                    <Input placeholder="Nom du contact" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="email@exemple.fr" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Téléphone</Label>
                    <Input placeholder="+33 1 23 45 67 89" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Adresse</Label>
                  <Textarea placeholder="Adresse complète" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddSupplierOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setIsAddSupplierOpen(false)}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{suppliers.length}</p>
                <p className="text-sm text-muted-foreground">Fournisseurs actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">602</p>
                <p className="text-sm text-muted-foreground">Commandes totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Euro className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-2xl font-bold">135K €</p>
                <p className="text-sm text-muted-foreground">Volume mensuel</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-muted-foreground">Livraison à temps</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suppliers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suppliers">Fournisseurs</TabsTrigger>
          <TabsTrigger value="orders">Commandes</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Liste des Fournisseurs</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {filteredSuppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedSupplier(supplier)}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                      {supplier.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{supplier.name}</h3>
                        <Badge variant="outline">{supplier.type}</Badge>
                        {supplier.status === "warning" && (
                          <Badge variant="destructive">Attention</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {supplier.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {supplier.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-500" />
                          {supplier.rating}/5
                        </span>
                        <span>{supplier.totalOrders} commandes</span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {supplier.onTimeDelivery}% à temps
                        </span>
                        <span>{supplier.products} produits</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{supplier.monthlyVolume.toLocaleString()} €</p>
                      <p className="text-xs text-muted-foreground">Volume mensuel</p>
                      <p className="mt-2 text-xs">
                        Contrat: <span className="font-medium">{supplier.contract}</span>
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Package className="mr-2 h-4 w-4" />
                          Commander
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Catalogue
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Commandes</CardTitle>
              <CardDescription>Dernières commandes passées</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° Commande</TableHead>
                    <TableHead>Fournisseur</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Articles</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono font-medium">{order.id}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell className="font-medium">{order.amount.toLocaleString()} €</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suggestions de Commandes</CardTitle>
              <CardDescription>
                Recommandations basées sur les niveaux de stock actuels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg border p-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{suggestion.product}</h4>
                        {getUrgencyBadge(suggestion.urgency)}
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Stock actuel: {suggestion.currentStock}</span>
                        <span>Seuil min: {suggestion.minStock}</span>
                        <span>Fournisseur: {suggestion.supplier}</span>
                      </div>
                      <div className="mt-2">
                        <Progress
                          value={(suggestion.currentStock / suggestion.minStock) * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{suggestion.suggestedQty} unités</p>
                      <p className="text-xs text-muted-foreground">Quantité suggérée</p>
                    </div>
                    <Button>Commander</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Supplier Detail Dialog */}
      <Dialog open={!!selectedSupplier} onOpenChange={() => setSelectedSupplier(null)}>
        <DialogContent className="max-w-2xl">
          {selectedSupplier && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedSupplier.name}</DialogTitle>
                <DialogDescription>{selectedSupplier.type}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Contact</Label>
                    <p className="font-medium">{selectedSupplier.contact}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedSupplier.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Téléphone</Label>
                    <p className="font-medium">{selectedSupplier.phone}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Adresse</Label>
                    <p className="font-medium text-sm">{selectedSupplier.address}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedSupplier.rating}</p>
                    <p className="text-xs text-muted-foreground">Note /5</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedSupplier.totalOrders}</p>
                    <p className="text-xs text-muted-foreground">Commandes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedSupplier.onTimeDelivery}%</p>
                    <p className="text-xs text-muted-foreground">Ponctualité</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedSupplier.avgDeliveryDays}j</p>
                    <p className="text-xs text-muted-foreground">Délai moyen</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedSupplier(null)}>
                  Fermer
                </Button>
                <Button>Passer une commande</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
