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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Search,
  Calendar,
  AlertTriangle,
  Clock,
  Package,
  Trash2,
  RotateCcw,
  Download,
  Filter,
  ChevronRight,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// Expiration data
const expiringProducts = [
  {
    id: "exp1",
    name: "Paracétamol 500mg",
    batch: "LOT-2023-4521",
    quantity: 150,
    expirationDate: "2024-02-15",
    daysLeft: 30,
    location: "Pharmacie Centrale",
    status: "warning",
    value: 75,
  },
  {
    id: "exp2",
    name: "Insuline 100UI",
    batch: "LOT-2023-8745",
    quantity: 25,
    expirationDate: "2024-02-01",
    daysLeft: 16,
    location: "Chambre Froide",
    status: "critical",
    value: 375,
  },
  {
    id: "exp3",
    name: "Amoxicilline 1g",
    batch: "LOT-2023-3256",
    quantity: 80,
    expirationDate: "2024-01-25",
    daysLeft: 9,
    location: "Stock Réanimation",
    status: "critical",
    value: 240,
  },
  {
    id: "exp4",
    name: "Morphine 10mg",
    batch: "LOT-2023-9012",
    quantity: 40,
    expirationDate: "2024-03-10",
    daysLeft: 54,
    location: "Coffre Stupéfiants",
    status: "normal",
    value: 400,
  },
  {
    id: "exp5",
    name: "Héparine 5000UI",
    batch: "LOT-2023-6543",
    quantity: 60,
    expirationDate: "2024-02-28",
    daysLeft: 43,
    location: "Stock Cardiologie",
    status: "warning",
    value: 540,
  },
  {
    id: "exp6",
    name: "Sérum Physiologique 500ml",
    batch: "LOT-2023-1234",
    quantity: 200,
    expirationDate: "2024-01-20",
    daysLeft: 4,
    location: "Pharmacie Centrale",
    status: "expired",
    value: 200,
  },
  {
    id: "exp7",
    name: "Vaccin Grippe",
    batch: "LOT-2023-7890",
    quantity: 30,
    expirationDate: "2024-04-15",
    daysLeft: 90,
    location: "Chambre Froide",
    status: "normal",
    value: 450,
  },
  {
    id: "exp8",
    name: "Diazépam 10mg",
    batch: "LOT-2023-5678",
    quantity: 100,
    expirationDate: "2024-02-20",
    daysLeft: 35,
    location: "Coffre Stupéfiants",
    status: "warning",
    value: 150,
  },
];

// Summary data
const expirationSummary = [
  { period: "Expiré", count: 1, value: 200, color: "hsl(var(--destructive))" },
  { period: "< 7 jours", count: 1, value: 240, color: "#ef4444" },
  { period: "7-30 jours", count: 2, value: 450, color: "#f59e0b" },
  { period: "30-90 jours", count: 3, value: 1090, color: "#22c55e" },
  { period: "> 90 jours", count: 1, value: 450, color: "hsl(var(--primary))" },
];

const monthlyExpiration = [
  { month: "Jan", count: 2, value: 440 },
  { month: "Fév", count: 3, value: 765 },
  { month: "Mar", count: 1, value: 400 },
  { month: "Avr", count: 1, value: 450 },
  { month: "Mai", count: 0, value: 0 },
  { month: "Juin", count: 0, value: 0 },
];

// Disposal records
const disposalRecords = [
  {
    id: "d1",
    date: "2024-01-10",
    product: "Aspirine 500mg",
    batch: "LOT-2023-1111",
    quantity: 50,
    reason: "Expiration",
    disposedBy: "Dr. Martin",
    value: 25,
    certificate: "CERT-2024-001",
  },
  {
    id: "d2",
    date: "2024-01-08",
    product: "Insuline 100UI",
    batch: "LOT-2023-2222",
    quantity: 10,
    reason: "Rupture chaîne du froid",
    disposedBy: "Sophie Durand",
    value: 150,
    certificate: "CERT-2024-002",
  },
  {
    id: "d3",
    date: "2024-01-05",
    product: "Vaccin Hépatite B",
    batch: "LOT-2023-3333",
    quantity: 5,
    reason: "Expiration",
    disposedBy: "Dr. Martin",
    value: 200,
    certificate: "CERT-2024-003",
  },
];

export default function ExpirationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isDisposeDialogOpen, setIsDisposeDialogOpen] = useState(false);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);

  const filteredProducts = expiringProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.batch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string, daysLeft: number) => {
    if (status === "expired") {
      return <Badge variant="destructive">Expiré</Badge>;
    }
    if (daysLeft <= 7) {
      return <Badge variant="destructive">{daysLeft}j restants</Badge>;
    }
    if (daysLeft <= 30) {
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200">{daysLeft}j restants</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800 border-green-200">{daysLeft}j restants</Badge>;
  };

  const totalAtRisk = expiringProducts.filter((p) => p.daysLeft <= 30).length;
  const totalExpired = expiringProducts.filter((p) => p.status === "expired").length;
  const totalValue = expiringProducts.filter((p) => p.daysLeft <= 30).reduce((acc, p) => acc + p.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestion des Péremptions</h1>
          <p className="text-muted-foreground">
            Suivi et gestion des dates de péremption des médicaments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Planning
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">{totalExpired}</p>
                <p className="text-sm text-red-600/80">Produits expirés</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-2xl font-bold text-amber-600">{totalAtRisk}</p>
                <p className="text-sm text-amber-600/80">À risque (30j)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{expiringProducts.length}</p>
                <p className="text-sm text-muted-foreground">Total surveillés</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">{totalValue} €</p>
                <p className="text-sm text-muted-foreground">Valeur à risque</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="analytics">Analyse</TabsTrigger>
          <TabsTrigger value="disposal">Destruction</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Produits à Surveiller</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      className="w-[200px] pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="expired">Expirés</SelectItem>
                      <SelectItem value="critical">Critiques</SelectItem>
                      <SelectItem value="warning">Attention</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selectedProducts.length > 0 && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-muted p-3">
                  <span className="text-sm font-medium">
                    {selectedProducts.length} produit(s) sélectionné(s)
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-auto bg-transparent"
                    onClick={() => setIsTransferDialogOpen(true)}
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Transférer
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setIsDisposeDialogOpen(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Détruire
                  </Button>
                </div>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedProducts.length === filteredProducts.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedProducts(filteredProducts.map((p) => p.id));
                          } else {
                            setSelectedProducts([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead>Lot</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Expiration</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Localisation</TableHead>
                    <TableHead>Valeur</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow
                      key={product.id}
                      className={product.status === "expired" ? "bg-red-50" : product.status === "critical" ? "bg-amber-50/50" : ""}
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedProducts([...selectedProducts, product.id]);
                            } else {
                              setSelectedProducts(selectedProducts.filter((id) => id !== product.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="font-mono text-sm">{product.batch}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.expirationDate}</TableCell>
                      <TableCell>{getStatusBadge(product.status, product.daysLeft)}</TableCell>
                      <TableCell>{product.location}</TableCell>
                      <TableCell>{product.value} €</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" title="Transférer">
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Détruire">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Échéance</CardTitle>
                <CardDescription>Distribution des produits selon leur date d'expiration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expirationSummary}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="count"
                        label={({ period, count }) => `${period}: ${count}`}
                      >
                        {expirationSummary.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {expirationSummary.map((item) => (
                    <div key={item.period} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.period}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium">{item.count} produits</span>
                        <span className="ml-2 text-xs text-muted-foreground">({item.value} €)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expirations Mensuelles</CardTitle>
                <CardDescription>Prévision des expirations par mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyExpiration}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" name="Produits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Alertes Automatiques</CardTitle>
              <CardDescription>Configuration des alertes de péremption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="font-medium">Alerte Critique</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Notification immédiate pour les produits expirant dans moins de 7 jours
                  </p>
                  <Badge className="mt-2">Actif</Badge>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="font-medium">Alerte Attention</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Email quotidien pour les produits expirant dans 30 jours
                  </p>
                  <Badge className="mt-2">Actif</Badge>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span className="font-medium">Rapport Hebdo</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Rapport hebdomadaire de tous les produits à surveiller
                  </p>
                  <Badge className="mt-2">Actif</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disposal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registre de Destruction</CardTitle>
              <CardDescription>Historique des produits détruits pour traçabilité réglementaire</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead>Lot</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Motif</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Valeur</TableHead>
                    <TableHead>Certificat</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disposalRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell className="font-medium">{record.product}</TableCell>
                      <TableCell className="font-mono text-sm">{record.batch}</TableCell>
                      <TableCell>{record.quantity}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.reason}</Badge>
                      </TableCell>
                      <TableCell>{record.disposedBy}</TableCell>
                      <TableCell>{record.value} €</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          {record.certificate}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="pt-4">
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Destructions ce mois</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-2xl font-bold">375 €</p>
                <p className="text-sm text-muted-foreground">Valeur détruite</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm text-muted-foreground">Conformité certificats</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dispose Dialog */}
      <Dialog open={isDisposeDialogOpen} onOpenChange={setIsDisposeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la Destruction</DialogTitle>
            <DialogDescription>
              Vous êtes sur le point de détruire {selectedProducts.length} produit(s).
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Un certificat de destruction sera généré automatiquement.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDisposeDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setIsDisposeDialogOpen(false);
                setSelectedProducts([]);
              }}
            >
              Confirmer la destruction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transférer les Produits</DialogTitle>
            <DialogDescription>
              Transférer {selectedProducts.length} produit(s) vers un autre établissement
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Destination</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un établissement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">CHU Bordeaux</SelectItem>
                  <SelectItem value="h2">Clinique du Parc</SelectItem>
                  <SelectItem value="h3">Hôpital Saint-André</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTransferDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={() => {
                setIsTransferDialogOpen(false);
                setSelectedProducts([]);
              }}
            >
              Confirmer le transfert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
