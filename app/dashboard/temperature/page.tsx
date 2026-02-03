"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts";
import {
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  TrendingUp,
  TrendingDown,
  Bell,
  RefreshCw,
  Download,
  Settings,
  Snowflake,
  Sun,
  Droplets,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Temperature zones
const temperatureZones = [
  {
    id: "zone1",
    name: "Pharmacie Centrale",
    location: "RDC - Bâtiment A",
    currentTemp: 4.2,
    minTemp: 2,
    maxTemp: 8,
    humidity: 45,
    status: "normal",
    lastUpdate: "Il y a 2 min",
    sensors: 3,
    products: ["Insuline", "Vaccins", "Sérums"],
  },
  {
    id: "zone2",
    name: "Chambre Froide",
    location: "Sous-sol - Bâtiment A",
    currentTemp: -18.5,
    minTemp: -25,
    maxTemp: -15,
    humidity: 30,
    status: "normal",
    lastUpdate: "Il y a 1 min",
    sensors: 2,
    products: ["Plasma", "Produits sanguins"],
  },
  {
    id: "zone3",
    name: "Réserve Médicaments",
    location: "1er étage - Bâtiment B",
    currentTemp: 22.1,
    minTemp: 15,
    maxTemp: 25,
    humidity: 52,
    status: "normal",
    lastUpdate: "Il y a 3 min",
    sensors: 4,
    products: ["Comprimés", "Sirops", "Crèmes"],
  },
  {
    id: "zone4",
    name: "Stock Réanimation",
    location: "1er étage - Bâtiment A",
    currentTemp: 6.8,
    minTemp: 2,
    maxTemp: 8,
    humidity: 48,
    status: "warning",
    lastUpdate: "Il y a 1 min",
    sensors: 2,
    products: ["Adrénaline", "Atropine"],
  },
  {
    id: "zone5",
    name: "Stock Oncologie",
    location: "2ème étage - Bâtiment B",
    currentTemp: 5.1,
    minTemp: 2,
    maxTemp: 8,
    humidity: 44,
    status: "normal",
    lastUpdate: "Il y a 4 min",
    sensors: 2,
    products: ["Chimiothérapie"],
  },
  {
    id: "zone6",
    name: "Armoire Transport",
    location: "Mobile - Coursier 1",
    currentTemp: 9.2,
    minTemp: 2,
    maxTemp: 8,
    humidity: 55,
    status: "critical",
    lastUpdate: "Il y a 30 sec",
    sensors: 1,
    products: ["Livraison en cours"],
  },
];

// Historical temperature data
const generateTempHistory = (baseTemp: number, variance: number) => {
  const hours = [];
  for (let i = 23; i >= 0; i--) {
    hours.push({
      time: `${String(23 - i).padStart(2, "0")}:00`,
      temp: baseTemp + (Math.random() * variance * 2 - variance),
      min: baseTemp - variance,
      max: baseTemp + variance,
    });
  }
  return hours;
};

const tempHistoryData = generateTempHistory(4, 2);

// Alerts
const temperatureAlerts = [
  {
    id: "a1",
    zone: "Armoire Transport",
    type: "critical",
    message: "Température hors plage: 9.2°C (max: 8°C)",
    time: "Il y a 30 sec",
    acknowledged: false,
  },
  {
    id: "a2",
    zone: "Stock Réanimation",
    type: "warning",
    message: "Température proche du seuil: 6.8°C (max: 8°C)",
    time: "Il y a 5 min",
    acknowledged: false,
  },
  {
    id: "a3",
    zone: "Pharmacie Centrale",
    type: "info",
    message: "Capteur #3 maintenance programmée",
    time: "Il y a 1 heure",
    acknowledged: true,
  },
  {
    id: "a4",
    zone: "Chambre Froide",
    type: "resolved",
    message: "Température normalisée après intervention",
    time: "Il y a 2 heures",
    acknowledged: true,
  },
];

// Sensor data
const sensorData = [
  { id: "s1", name: "Capteur Pharma-1", zone: "Pharmacie Centrale", battery: 85, lastCalibration: "2024-01-01", status: "active" },
  { id: "s2", name: "Capteur Pharma-2", zone: "Pharmacie Centrale", battery: 72, lastCalibration: "2024-01-01", status: "active" },
  { id: "s3", name: "Capteur Pharma-3", zone: "Pharmacie Centrale", battery: 15, lastCalibration: "2023-12-15", status: "low-battery" },
  { id: "s4", name: "Capteur Frigo-1", zone: "Chambre Froide", battery: 92, lastCalibration: "2024-01-05", status: "active" },
  { id: "s5", name: "Capteur Frigo-2", zone: "Chambre Froide", battery: 88, lastCalibration: "2024-01-05", status: "active" },
  { id: "s6", name: "Capteur Mobile-1", zone: "Armoire Transport", battery: 45, lastCalibration: "2024-01-10", status: "active" },
];

export default function TemperaturePage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState("30");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-500";
      case "warning":
        return "bg-amber-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Normal</Badge>;
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Attention</Badge>;
      case "critical":
        return <Badge variant="destructive">Critique</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTempIcon = (temp: number) => {
    if (temp < 0) return <Snowflake className="h-5 w-5 text-blue-500" />;
    if (temp > 15) return <Sun className="h-5 w-5 text-amber-500" />;
    return <Thermometer className="h-5 w-5 text-primary" />;
  };

  const normalZones = temperatureZones.filter((z) => z.status === "normal").length;
  const warningZones = temperatureZones.filter((z) => z.status === "warning").length;
  const criticalZones = temperatureZones.filter((z) => z.status === "critical").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Monitoring Température</h1>
          <p className="text-muted-foreground">
            Surveillance en temps réel des conditions de stockage
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <Label htmlFor="auto-refresh" className="text-sm">
              Auto-refresh
            </Label>
          </div>
          <Select value={refreshInterval} onValueChange={setRefreshInterval}>
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 sec</SelectItem>
              <SelectItem value="30">30 sec</SelectItem>
              <SelectItem value="60">1 min</SelectItem>
              <SelectItem value="300">5 min</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{normalZones}</p>
                <p className="text-sm text-muted-foreground">Zones normales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{warningZones}</p>
                <p className="text-sm text-muted-foreground">Attention requise</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{criticalZones}</p>
                <p className="text-sm text-muted-foreground">Alertes critiques</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Thermometer className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{sensorData.length}</p>
                <p className="text-sm text-muted-foreground">Capteurs actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="zones" className="space-y-4">
        <TabsList>
          <TabsTrigger value="zones">Zones de Stockage</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="alerts">Alertes</TabsTrigger>
          <TabsTrigger value="sensors">Capteurs</TabsTrigger>
        </TabsList>

        <TabsContent value="zones" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {temperatureZones.map((zone) => (
              <Card
                key={zone.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  zone.status === "critical"
                    ? "border-red-300 bg-red-50/50"
                    : zone.status === "warning"
                    ? "border-amber-300 bg-amber-50/50"
                    : ""
                }`}
                onClick={() => setSelectedZone(zone.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{zone.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {zone.location}
                      </CardDescription>
                    </div>
                    <div className={`h-3 w-3 rounded-full ${getStatusColor(zone.status)} animate-pulse`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTempIcon(zone.currentTemp)}
                      <span className="text-3xl font-bold">{zone.currentTemp}°C</span>
                    </div>
                    {getStatusBadge(zone.status)}
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Min: {zone.minTemp}°C</span>
                      <span>Max: {zone.maxTemp}°C</span>
                    </div>
                    <div className="relative h-2 rounded-full bg-muted">
                      <div
                        className={`absolute h-full rounded-full ${getStatusColor(zone.status)}`}
                        style={{
                          left: `${((zone.currentTemp - zone.minTemp) / (zone.maxTemp - zone.minTemp)) * 100}%`,
                          width: "8px",
                          transform: "translateX(-50%)",
                        }}
                      />
                      <div
                        className="absolute h-full bg-green-200 rounded-full"
                        style={{
                          left: "20%",
                          width: "60%",
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Droplets className="h-3 w-3" />
                      {zone.humidity}%
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {zone.lastUpdate}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {zone.products.map((product, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Historique des Températures</CardTitle>
                  <CardDescription>Dernières 24 heures - Pharmacie Centrale</CardDescription>
                </div>
                <Select defaultValue="zone1">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {temperatureZones.map((zone) => (
                      <SelectItem key={zone.id} value={zone.id}>
                        {zone.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={tempHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis domain={[0, 10]} className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value.toFixed(1)}°C`, "Température"]}
                    />
                    <ReferenceLine y={2} stroke="hsl(var(--destructive))" strokeDasharray="5 5" label="Min" />
                    <ReferenceLine y={8} stroke="hsl(var(--destructive))" strokeDasharray="5 5" label="Max" />
                    <Area
                      type="monotone"
                      dataKey="temp"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alertes Température</CardTitle>
              <CardDescription>Notifications et incidents de température</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {temperatureAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-4 rounded-lg border p-4 ${
                      alert.type === "critical"
                        ? "border-red-200 bg-red-50"
                        : alert.type === "warning"
                        ? "border-amber-200 bg-amber-50"
                        : alert.acknowledged
                        ? "bg-muted/30"
                        : ""
                    }`}
                  >
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{alert.zone}</span>
                        {!alert.acknowledged && (
                          <Badge variant="outline" className="text-xs">
                            Non acquittée
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                    {!alert.acknowledged && (
                      <Button size="sm" variant="outline">
                        Acquitter
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sensors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Capteurs</CardTitle>
              <CardDescription>État et maintenance des capteurs de température</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Capteur</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead>Batterie</TableHead>
                    <TableHead>Dernière calibration</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sensorData.map((sensor) => (
                    <TableRow key={sensor.id}>
                      <TableCell className="font-medium">{sensor.name}</TableCell>
                      <TableCell>{sensor.zone}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={sensor.battery}
                            className={`h-2 w-16 ${
                              sensor.battery < 20 ? "[&>div]:bg-red-500" : sensor.battery < 50 ? "[&>div]:bg-amber-500" : ""
                            }`}
                          />
                          <span className="text-sm">{sensor.battery}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{sensor.lastCalibration}</TableCell>
                      <TableCell>
                        {sensor.status === "active" ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">Actif</Badge>
                        ) : (
                          <Badge variant="destructive">Batterie faible</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
