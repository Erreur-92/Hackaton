"use client";

import { useState, useMemo } from "react";
import {
  mockRooms,
  mockPatients,
  mockProducts,
  calculateStockForecasts,
  type Room,
  type Patient,
  type StockForecast,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Building,
  User,
  Pill,
  AlertTriangle,
  TrendingDown,
  Calendar,
  BedDouble,
  Activity,
  ShieldAlert,
  Package,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ForecastPeriod = "1day" | "3days" | "1week" | "1month";

const forecastLabels: Record<ForecastPeriod, string> = {
  "1day": "1 jour",
  "3days": "3 jours",
  "1week": "1 semaine",
  "1month": "1 mois",
};

const roomTypeLabels: Record<Room["type"], string> = {
  standard: "Standard",
  double: "Double",
  icu: "Soins Intensifs",
  isolation: "Isolement",
};

const roomTypeColors: Record<Room["type"], string> = {
  standard: "bg-primary/10 border-primary/30 hover:bg-primary/20",
  double: "bg-accent/10 border-accent/30 hover:bg-accent/20",
  icu: "bg-destructive/10 border-destructive/30 hover:bg-destructive/20",
  isolation: "bg-warning/10 border-warning/30 hover:bg-warning/20",
};

const serviceColors: Record<string, string> = {
  Réanimation: "text-destructive",
  Pédiatrie: "text-accent",
  Oncologie: "text-chart-5",
  Neurologie: "text-chart-3",
  Cardiologie: "text-primary",
};

export default function HospitalMapPage() {
  const [selectedFloor, setSelectedFloor] = useState<1 | 2 | 3>(1);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [forecastPeriod, setForecastPeriod] = useState<ForecastPeriod>("1week");
  const [showForecastDialog, setShowForecastDialog] = useState(false);

  const stockForecasts = useMemo(() => calculateStockForecasts(), []);

  const floorRooms = useMemo(
    () => mockRooms.filter((room) => room.floor === selectedFloor),
    [selectedFloor]
  );

  const floorServices = useMemo(() => {
    const services = new Set(floorRooms.map((r) => r.service));
    return Array.from(services);
  }, [floorRooms]);

  const getRoomPatients = (room: Room): Patient[] => {
    return room.patients
      .map((patientId) => mockPatients.find((p) => p.id === patientId))
      .filter(Boolean) as Patient[];
  };

  const getFloorStats = () => {
    const rooms = floorRooms;
    const totalBeds = rooms.reduce((acc, r) => acc + r.capacity, 0);
    const occupiedBeds = rooms.reduce((acc, r) => acc + r.patients.length, 0);
    const emptyRooms = rooms.filter((r) => r.patients.length === 0).length;
    const icuRooms = rooms.filter((r) => r.type === "icu").length;
    return { totalBeds, occupiedBeds, emptyRooms, icuRooms, totalRooms: rooms.length };
  };

  const stats = getFloorStats();

  const getForecastValue = (forecast: StockForecast): number => {
    switch (forecastPeriod) {
      case "1day":
        return forecast.forecast1Day;
      case "3days":
        return forecast.forecast3Days;
      case "1week":
        return forecast.forecast1Week;
      case "1month":
        return forecast.forecast1Month;
    }
  };

  const getForecastStatus = (forecast: StockForecast): "normal" | "low" | "critical" => {
    switch (forecastPeriod) {
      case "1day":
        return forecast.status1Day;
      case "3days":
        return forecast.status3Days;
      case "1week":
        return forecast.status1Week;
      case "1month":
        return forecast.status1Month;
    }
  };

  const criticalForecasts = stockForecasts.filter(
    (f) => getForecastStatus(f) === "critical"
  );

  const lowForecasts = stockForecasts.filter(
    (f) => getForecastStatus(f) === "low"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Carte de l'Hôpital</h1>
          <p className="text-sm text-muted-foreground">
            Vue des chambres, patients et prévisions de stocks
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={forecastPeriod}
            onValueChange={(v) => setForecastPeriod(v as ForecastPeriod)}
          >
            <SelectTrigger className="w-[140px]">
              <Clock className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1day">1 jour</SelectItem>
              <SelectItem value="3days">3 jours</SelectItem>
              <SelectItem value="1week">1 semaine</SelectItem>
              <SelectItem value="1month">1 mois</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowForecastDialog(true)}>
            <TrendingDown className="mr-2 h-4 w-4" />
            Prévisions stocks
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {(criticalForecasts.length > 0 || lowForecasts.length > 0) && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  Alertes de stock ({forecastLabels[forecastPeriod]})
                </p>
                <div className="flex flex-wrap gap-2">
                  {criticalForecasts.map((f) => (
                    <Badge key={f.productId} variant="destructive">
                      {f.productName}: {getForecastValue(f)} unités
                    </Badge>
                  ))}
                  {lowForecasts.map((f) => (
                    <Badge
                      key={f.productId}
                      className="bg-warning text-warning-foreground hover:bg-warning/90"
                    >
                      {f.productName}: {getForecastValue(f)} unités
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floor Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BedDouble className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lits occupés</p>
              <p className="text-xl font-bold text-foreground">
                {stats.occupiedBeds}/{stats.totalBeds}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Building className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Chambres libres</p>
              <p className="text-xl font-bold text-foreground">{stats.emptyRooms}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <Activity className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Soins intensifs</p>
              <p className="text-xl font-bold text-foreground">{stats.icuRooms}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-5/10">
              <User className="h-5 w-5 text-chart-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Patients</p>
              <p className="text-xl font-bold text-foreground">{stats.occupiedBeds}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <Package className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Alertes stock</p>
              <p className="text-xl font-bold text-foreground">
                {criticalForecasts.length + lowForecasts.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floor Tabs */}
      <Tabs
        value={String(selectedFloor)}
        onValueChange={(v) => setSelectedFloor(Number(v) as 1 | 2 | 3)}
      >
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="1">
            <Building className="mr-2 h-4 w-4" />
            Étage 1
          </TabsTrigger>
          <TabsTrigger value="2">
            <Building className="mr-2 h-4 w-4" />
            Étage 2
          </TabsTrigger>
          <TabsTrigger value="3">
            <Building className="mr-2 h-4 w-4" />
            Étage 3
          </TabsTrigger>
        </TabsList>

        {[1, 2, 3].map((floor) => (
          <TabsContent key={floor} value={String(floor)} className="mt-6">
            {/* Services Legend */}
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Services:</span>
              {floorServices.map((service) => (
                <div key={service} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-3 w-3 rounded-full",
                      service === "Réanimation" && "bg-destructive",
                      service === "Pédiatrie" && "bg-accent",
                      service === "Oncologie" && "bg-chart-5",
                      service === "Neurologie" && "bg-chart-3",
                      service === "Cardiologie" && "bg-primary"
                    )}
                  />
                  <span className="text-sm">{service}</span>
                </div>
              ))}
            </div>

            {/* Room Type Legend */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Types:</span>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded border-2 border-primary/50 bg-primary/10" />
                <span className="text-sm">Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded border-2 border-accent/50 bg-accent/10" />
                <span className="text-sm">Double</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded border-2 border-destructive/50 bg-destructive/10" />
                <span className="text-sm">Soins Intensifs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded border-2 border-warning/50 bg-warning/10" />
                <span className="text-sm">Isolement</span>
              </div>
            </div>

            {/* Floor Map */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Plan de l'étage {floor}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg border-2 border-dashed border-border bg-muted/30 p-6">
                  {/* Corridor */}
                  <div className="absolute left-1/2 top-1/2 h-4 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted" />

                  {/* Rooms Grid */}
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {floorRooms.map((room) => {
                      const patients = getRoomPatients(room);
                      const isEmpty = patients.length === 0;
                      const isFull = patients.length >= room.capacity;

                      return (
                        <button
                          key={room.id}
                          onClick={() => setSelectedRoom(room)}
                          className={cn(
                            "relative flex min-h-[120px] flex-col rounded-lg border-2 p-3 text-left transition-all",
                            roomTypeColors[room.type],
                            isEmpty && "opacity-60"
                          )}
                        >
                          {/* Room Header */}
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-foreground">
                              {room.number}
                            </span>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                serviceColors[room.service]
                              )}
                            >
                              {room.service.substring(0, 3)}
                            </Badge>
                          </div>

                          {/* Room Type */}
                          <span className="mt-1 text-xs text-muted-foreground">
                            {roomTypeLabels[room.type]}
                          </span>

                          {/* Patients */}
                          <div className="mt-auto pt-2">
                            {isEmpty ? (
                              <span className="text-xs text-muted-foreground">
                                Chambre vide
                              </span>
                            ) : (
                              <div className="space-y-1">
                                {patients.map((patient) => (
                                  <div
                                    key={patient.id}
                                    className="flex items-center gap-1.5"
                                  >
                                    <User className="h-3 w-3 text-muted-foreground" />
                                    <span className="truncate text-xs font-medium text-foreground">
                                      {patient.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Occupancy indicator */}
                          <div className="absolute bottom-2 right-2 flex gap-1">
                            {Array.from({ length: room.capacity }).map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "h-2 w-2 rounded-full",
                                  i < patients.length
                                    ? "bg-accent"
                                    : "bg-muted"
                                )}
                              />
                            ))}
                          </div>

                          {/* Alert badge for treatments */}
                          {patients.some((p) => p.treatments.length > 2) && (
                            <div className="absolute -right-1 -top-1">
                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Pill className="h-3 w-3" />
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Room Detail Dialog */}
      <Dialog open={!!selectedRoom} onOpenChange={() => setSelectedRoom(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          {selectedRoom && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <BedDouble className="h-5 w-5" />
                  Chambre {selectedRoom.number} - {selectedRoom.service}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Room Info */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    {roomTypeLabels[selectedRoom.type]}
                  </Badge>
                  <Badge variant="outline">
                    Capacité: {selectedRoom.capacity} lit(s)
                  </Badge>
                  <Badge
                    variant={
                      getRoomPatients(selectedRoom).length === 0
                        ? "secondary"
                        : "default"
                    }
                  >
                    {getRoomPatients(selectedRoom).length} patient(s)
                  </Badge>
                </div>

                {/* Patients & Treatments */}
                {getRoomPatients(selectedRoom).length > 0 ? (
                  getRoomPatients(selectedRoom).map((patient) => (
                    <Card key={patient.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">
                              {patient.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {patient.age} ans, {patient.gender === "M" ? "Homme" : "Femme"}
                            </p>
                          </div>
                          <Badge variant="outline">
                            <Calendar className="mr-1 h-3 w-3" />
                            {new Date(patient.admissionDate).toLocaleDateString("fr-FR")}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm">
                          <span className="font-medium">Diagnostic:</span>{" "}
                          {patient.diagnosis}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <h4 className="mb-3 flex items-center gap-2 font-medium">
                          <Pill className="h-4 w-4 text-primary" />
                          Traitements en cours
                        </h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Médicament</TableHead>
                              <TableHead>Dosage</TableHead>
                              <TableHead>Fréquence</TableHead>
                              <TableHead className="text-right">Qté/jour</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {patient.treatments.map((treatment) => (
                              <TableRow key={treatment.id}>
                                <TableCell className="font-medium">
                                  {treatment.productName}
                                </TableCell>
                                <TableCell>{treatment.dosage}</TableCell>
                                <TableCell>{treatment.frequency}</TableCell>
                                <TableCell className="text-right">
                                  {treatment.dailyQuantity}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        {/* Consumption forecast */}
                        <div className="mt-4 rounded-lg bg-muted/50 p-3">
                          <h5 className="mb-2 text-sm font-medium">
                            Consommation prévisionnelle (ce patient)
                          </h5>
                          <div className="grid gap-2 text-sm sm:grid-cols-4">
                            <div>
                              <span className="text-muted-foreground">1 jour:</span>{" "}
                              <span className="font-medium">
                                {patient.treatments.reduce((a, t) => a + t.dailyQuantity, 0)} unités
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">3 jours:</span>{" "}
                              <span className="font-medium">
                                {patient.treatments.reduce((a, t) => a + t.dailyQuantity * 3, 0)} unités
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">1 semaine:</span>{" "}
                              <span className="font-medium">
                                {patient.treatments.reduce((a, t) => a + t.dailyQuantity * 7, 0)} unités
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">1 mois:</span>{" "}
                              <span className="font-medium">
                                {patient.treatments.reduce((a, t) => a + t.dailyQuantity * 30, 0)} unités
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <BedDouble className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <p className="mt-2 text-muted-foreground">
                        Cette chambre est actuellement vide
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Stock Forecast Dialog */}
      <Dialog open={showForecastDialog} onOpenChange={setShowForecastDialog}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Prévisions des stocks
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Period Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Période:</span>
              <div className="flex gap-2">
                {(["1day", "3days", "1week", "1month"] as ForecastPeriod[]).map(
                  (period) => (
                    <Button
                      key={period}
                      variant={forecastPeriod === period ? "default" : "outline"}
                      size="sm"
                      onClick={() => setForecastPeriod(period)}
                    >
                      {forecastLabels[period]}
                    </Button>
                  )
                )}
              </div>
            </div>

            {/* Forecasts Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead className="text-right">Stock actuel</TableHead>
                  <TableHead className="text-right">Conso./jour</TableHead>
                  <TableHead className="text-right">
                    Stock à {forecastLabels[forecastPeriod]}
                  </TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Niveau</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockForecasts.map((forecast) => {
                  const forecastValue = getForecastValue(forecast);
                  const status = getForecastStatus(forecast);
                  const product = mockProducts.find(
                    (p) => p.id === forecast.productId
                  );
                  const percentage = product
                    ? Math.min(100, (forecastValue / product.minThreshold) * 100)
                    : 0;

                  return (
                    <TableRow key={forecast.productId}>
                      <TableCell className="font-medium">
                        {forecast.productName}
                      </TableCell>
                      <TableCell className="text-right">
                        {forecast.currentStock}
                      </TableCell>
                      <TableCell className="text-right">
                        {forecast.dailyConsumption}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {forecastValue}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            status === "critical"
                              ? "destructive"
                              : status === "low"
                              ? "outline"
                              : "default"
                          }
                          className={
                            status === "low"
                              ? "border-warning bg-warning/10 text-warning"
                              : status === "normal"
                              ? "bg-accent text-accent-foreground"
                              : ""
                          }
                        >
                          {status === "critical"
                            ? "Critique"
                            : status === "low"
                            ? "Faible"
                            : "Normal"}
                        </Badge>
                      </TableCell>
                      <TableCell className="w-[150px]">
                        <Progress
                          value={percentage}
                          className={cn(
                            "h-2",
                            status === "critical" &&
                              "[&>div]:bg-destructive",
                            status === "low" && "[&>div]:bg-warning",
                            status === "normal" && "[&>div]:bg-accent"
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="border-destructive/50">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="h-8 w-8 text-destructive" />
                    <div>
                      <p className="text-2xl font-bold text-destructive">
                        {criticalForecasts.length}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Stocks critiques
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-warning/50">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-warning" />
                    <div>
                      <p className="text-2xl font-bold text-warning">
                        {lowForecasts.length}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Stocks faibles
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-accent/50">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <Package className="h-8 w-8 text-accent" />
                    <div>
                      <p className="text-2xl font-bold text-accent">
                        {stockForecasts.filter((f) => getForecastStatus(f) === "normal").length}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Stocks normaux
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            {criticalForecasts.length > 0 && (
              <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    Recommandations de commande urgente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {criticalForecasts.map((f) => {
                      const product = mockProducts.find((p) => p.id === f.productId);
                      const recommended = product
                        ? Math.max(product.minThreshold * 2 - getForecastValue(f), 0)
                        : 0;
                      return (
                        <li key={f.productId} className="flex items-center justify-between text-sm">
                          <span>{f.productName}</span>
                          <Badge variant="destructive">
                            Commander min. {Math.ceil(recommended)} unités
                          </Badge>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
