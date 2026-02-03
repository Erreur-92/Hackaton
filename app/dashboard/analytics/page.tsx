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
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  Truck,
  Users,
  Activity,
  Thermometer,
  Calendar,
  Target,
  Zap,
  BarChart3,
  PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// KPI Data
const kpiData = {
  deliveryPerformance: 94.5,
  stockAccuracy: 98.2,
  temperatureCompliance: 99.1,
  costEfficiency: 87.3,
  patientSatisfaction: 92.8,
  staffProductivity: 89.6,
};

const monthlyTrends = [
  { month: "Août", deliveries: 245, costs: 45000, incidents: 3, satisfaction: 91 },
  { month: "Sept", deliveries: 268, costs: 48000, incidents: 2, satisfaction: 92 },
  { month: "Oct", deliveries: 289, costs: 46500, incidents: 4, satisfaction: 90 },
  { month: "Nov", deliveries: 312, costs: 52000, incidents: 1, satisfaction: 93 },
  { month: "Déc", deliveries: 298, costs: 49000, incidents: 2, satisfaction: 94 },
  { month: "Jan", deliveries: 324, costs: 51000, incidents: 1, satisfaction: 95 },
];

const servicePerformance = [
  { service: "Réanimation", efficiency: 96, deliveryTime: 12, stockTurns: 8.5, score: 94 },
  { service: "Oncologie", efficiency: 92, deliveryTime: 18, stockTurns: 6.2, score: 89 },
  { service: "Cardiologie", efficiency: 94, deliveryTime: 15, stockTurns: 7.8, score: 91 },
  { service: "Neurologie", efficiency: 88, deliveryTime: 22, stockTurns: 5.4, score: 85 },
  { service: "Pédiatrie", efficiency: 91, deliveryTime: 16, stockTurns: 6.9, score: 88 },
];

const costBreakdown = [
  { name: "Médicaments", value: 62, color: "hsl(var(--chart-1))" },
  { name: "Logistique", value: 18, color: "hsl(var(--chart-2))" },
  { name: "Personnel", value: 12, color: "hsl(var(--chart-3))" },
  { name: "Stockage", value: 5, color: "hsl(var(--chart-4))" },
  { name: "Autres", value: 3, color: "hsl(var(--chart-5))" },
];

const radarData = [
  { metric: "Délai livraison", value: 92, fullMark: 100 },
  { metric: "Précision stock", value: 98, fullMark: 100 },
  { metric: "Temp. conformité", value: 99, fullMark: 100 },
  { metric: "Coût optimisé", value: 87, fullMark: 100 },
  { metric: "Satisfaction", value: 93, fullMark: 100 },
  { metric: "Productivité", value: 90, fullMark: 100 },
];

const hourlyDeliveries = [
  { hour: "06h", count: 8 },
  { hour: "08h", count: 24 },
  { hour: "10h", count: 42 },
  { hour: "12h", count: 18 },
  { hour: "14h", count: 38 },
  { hour: "16h", count: 32 },
  { hour: "18h", count: 22 },
  { hour: "20h", count: 12 },
  { hour: "22h", count: 6 },
];

const topMedications = [
  { name: "Paracétamol 500mg", usage: 2450, trend: 5.2, cost: 1225 },
  { name: "Morphine 10mg", usage: 890, trend: -2.1, cost: 8900 },
  { name: "Amoxicilline 1g", usage: 1120, trend: 8.4, cost: 3360 },
  { name: "Héparine 5000UI", usage: 680, trend: 1.8, cost: 6120 },
  { name: "Insuline 100UI", usage: 520, trend: 3.2, cost: 7800 },
];

const alerts = [
  { type: "warning", message: "Stock Morphine bas dans 3 jours", service: "Oncologie" },
  { type: "info", message: "Livraison programmée demain 8h", service: "Cardiologie" },
  { type: "success", message: "Audit conformité validé", service: "Tous" },
  { type: "warning", message: "Température limite atteinte", service: "Pharmacie" },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("month");
  const [selectedService, setSelectedService] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics Avancées</h1>
          <p className="text-muted-foreground">
            Tableau de bord analytique complet et indicateurs de performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les services</SelectItem>
              <SelectItem value="reanimation">Réanimation</SelectItem>
              <SelectItem value="oncologie">Oncologie</SelectItem>
              <SelectItem value="cardiologie">Cardiologie</SelectItem>
              <SelectItem value="neurologie">Neurologie</SelectItem>
              <SelectItem value="pediatrie">Pédiatrie</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <Truck className="h-8 w-8 text-primary" />
              <Badge variant="outline" className="text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                2.3%
              </Badge>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{kpiData.deliveryPerformance}%</p>
              <p className="text-xs text-muted-foreground">Performance livraison</p>
            </div>
            <Progress value={kpiData.deliveryPerformance} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <Package className="h-8 w-8 text-accent" />
              <Badge variant="outline" className="text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                0.8%
              </Badge>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{kpiData.stockAccuracy}%</p>
              <p className="text-xs text-muted-foreground">Précision stocks</p>
            </div>
            <Progress value={kpiData.stockAccuracy} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <Thermometer className="h-8 w-8 text-blue-500" />
              <Badge variant="outline" className="text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                0.2%
              </Badge>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{kpiData.temperatureCompliance}%</p>
              <p className="text-xs text-muted-foreground">Conformité temp.</p>
            </div>
            <Progress value={kpiData.temperatureCompliance} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <DollarSign className="h-8 w-8 text-amber-500" />
              <Badge variant="outline" className="text-red-600">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                1.2%
              </Badge>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{kpiData.costEfficiency}%</p>
              <p className="text-xs text-muted-foreground">Efficacité coûts</p>
            </div>
            <Progress value={kpiData.costEfficiency} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <Users className="h-8 w-8 text-purple-500" />
              <Badge variant="outline" className="text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                3.1%
              </Badge>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{kpiData.patientSatisfaction}%</p>
              <p className="text-xs text-muted-foreground">Satisfaction patient</p>
            </div>
            <Progress value={kpiData.patientSatisfaction} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <Activity className="h-8 w-8 text-rose-500" />
              <Badge variant="outline" className="text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                1.8%
              </Badge>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{kpiData.staffProductivity}%</p>
              <p className="text-xs text-muted-foreground">Productivité staff</p>
            </div>
            <Progress value={kpiData.staffProductivity} className="mt-2 h-1" />
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tendances Mensuelles</CardTitle>
            <CardDescription>Évolution des livraisons, coûts et incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis yAxisId="left" className="text-xs" />
                  <YAxis yAxisId="right" orientation="right" className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="deliveries"
                    name="Livraisons"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="satisfaction"
                    name="Satisfaction %"
                    stroke="hsl(var(--accent))"
                    fill="hsl(var(--accent))"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Radar</CardTitle>
            <CardDescription>Vue d'ensemble des indicateurs clés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" className="text-xs" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services" className="space-y-4">
        <TabsList>
          <TabsTrigger value="services">Par Service</TabsTrigger>
          <TabsTrigger value="costs">Analyse Coûts</TabsTrigger>
          <TabsTrigger value="medications">Top Médicaments</TabsTrigger>
          <TabsTrigger value="hourly">Activité Horaire</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Performance par Service</CardTitle>
              <CardDescription>Comparaison détaillée des indicateurs par service</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Efficacité</TableHead>
                    <TableHead>Délai moyen (min)</TableHead>
                    <TableHead>Rotation stock</TableHead>
                    <TableHead>Score global</TableHead>
                    <TableHead>Tendance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servicePerformance.map((service) => (
                    <TableRow key={service.service}>
                      <TableCell className="font-medium">{service.service}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={service.efficiency} className="h-2 w-20" />
                          <span className="text-sm">{service.efficiency}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={service.deliveryTime < 15 ? "default" : service.deliveryTime < 20 ? "secondary" : "destructive"}>
                          {service.deliveryTime} min
                        </Badge>
                      </TableCell>
                      <TableCell>{service.stockTurns}x</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              service.score >= 90
                                ? "bg-green-500"
                                : service.score >= 85
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                          />
                          {service.score}/100
                        </div>
                      </TableCell>
                      <TableCell>
                        {service.score >= 90 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-amber-500" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des Coûts</CardTitle>
                <CardDescription>Distribution par catégorie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {costBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Évolution des Coûts</CardTitle>
                <CardDescription>Tendance mensuelle des dépenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`${value.toLocaleString()} €`, "Coûts"]}
                      />
                      <Bar dataKey="costs" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Top Médicaments Consommés</CardTitle>
              <CardDescription>Classement par volume d'utilisation</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rang</TableHead>
                    <TableHead>Médicament</TableHead>
                    <TableHead>Consommation</TableHead>
                    <TableHead>Tendance</TableHead>
                    <TableHead>Coût total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topMedications.map((med, index) => (
                    <TableRow key={med.name}>
                      <TableCell>
                        <Badge variant="outline">#{index + 1}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell>{med.usage.toLocaleString()} unités</TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 ${med.trend > 0 ? "text-red-500" : "text-green-500"}`}>
                          {med.trend > 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {Math.abs(med.trend)}%
                        </div>
                      </TableCell>
                      <TableCell>{med.cost.toLocaleString()} €</TableCell>
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

        <TabsContent value="hourly">
          <Card>
            <CardHeader>
              <CardTitle>Activité par Heure</CardTitle>
              <CardDescription>Distribution des livraisons sur la journée</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyDeliveries}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="hour" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="count" name="Livraisons" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Alertes et Notifications Analytiques</CardTitle>
          <CardDescription>Points d'attention basés sur l'analyse des données</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 rounded-lg border p-3 ${
                  alert.type === "warning"
                    ? "border-amber-200 bg-amber-50"
                    : alert.type === "success"
                    ? "border-green-200 bg-green-50"
                    : "border-blue-200 bg-blue-50"
                }`}
              >
                {alert.type === "warning" ? (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                ) : alert.type === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Clock className="h-5 w-5 text-blue-500" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.service}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
