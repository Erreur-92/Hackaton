"use client";

import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import {
  Truck,
  CheckCircle2,
  AlertTriangle,
  Package,
  TrendingUp,
  Clock,
  PackageCheck,
  Bell,
  ThermometerSun,
  ArrowRight,
} from "lucide-react";
import {
  dashboardStats,
  mockDeliveries,
  mockAlerts,
  deliveryChartData,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function DashboardPage() {
  const recentDeliveries = mockDeliveries.slice(0, 4);
  const activeAlerts = mockAlerts.filter((a) => a.status !== "resolved").slice(0, 4);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
          <p className="text-muted-foreground">Vue globale du circuit du médicament</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Dernière mise à jour : il y a 2 min
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Livraisons en cours"
          value={dashboardStats.deliveriesInProgress}
          icon={Truck}
          variant="default"
        />
        <StatCard
          title="Livraisons terminées"
          value={dashboardStats.deliveriesCompleted}
          icon={CheckCircle2}
          trend={{ value: 12, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Incidents"
          value={dashboardStats.incidents}
          icon={AlertTriangle}
          variant="danger"
        />
        <StatCard
          title="Stocks critiques"
          value={dashboardStats.criticalStocks}
          icon={Package}
          variant="warning"
        />
      </div>

      {/* KPI Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{dashboardStats.complianceRate}%</p>
                <p className="text-xs text-muted-foreground">Taux de conformité</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{dashboardStats.avgDeliveryTime} min</p>
                <p className="text-xs text-muted-foreground">Temps moyen livraison</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                <PackageCheck className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{dashboardStats.dailyPackages}</p>
                <p className="text-xs text-muted-foreground">Colis / jour</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <Bell className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{dashboardStats.activeAlerts}</p>
                <p className="text-xs text-muted-foreground">Alertes actives</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Delivery Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Livraisons cette semaine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deliveryChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="deliveries" name="Livraisons" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="incidents" name="Incidents" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Alertes actives</CardTitle>
            <Link href="/dashboard/alerts">
              <Button variant="ghost" size="sm" className="text-xs">
                Voir tout <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-3"
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      alert.severity === "critical" ? "bg-destructive/10" : "bg-warning/10"
                    }`}
                  >
                    {alert.type === "temperature" ? (
                      <ThermometerSun
                        className={`h-4 w-4 ${
                          alert.severity === "critical" ? "text-destructive" : "text-warning-foreground"
                        }`}
                      />
                    ) : alert.type === "stock_low" ? (
                      <Package
                        className={`h-4 w-4 ${
                          alert.severity === "critical" ? "text-destructive" : "text-warning-foreground"
                        }`}
                      />
                    ) : (
                      <AlertTriangle
                        className={`h-4 w-4 ${
                          alert.severity === "critical" ? "text-destructive" : "text-warning-foreground"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(alert.createdAt).toLocaleString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <StatusBadge status={alert.status} type="alert" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Deliveries */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">Livraisons récentes</CardTitle>
          <Link href="/dashboard/deliveries">
            <Button variant="ghost" size="sm" className="text-xs">
              Voir tout <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">ID</th>
                  <th className="pb-3 pr-4 font-medium">Service</th>
                  <th className="pb-3 pr-4 font-medium">Produits</th>
                  <th className="pb-3 pr-4 font-medium">Coursier</th>
                  <th className="pb-3 pr-4 font-medium">Urgence</th>
                  <th className="pb-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="border-b border-border last:border-0">
                    <td className="py-3 pr-4 font-medium text-foreground">{delivery.id}</td>
                    <td className="py-3 pr-4 text-foreground">{delivery.destinationService.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {delivery.products.map((p) => p.productName).join(", ")}
                    </td>
                    <td className="py-3 pr-4 text-foreground">{delivery.courier.name}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={delivery.urgency} type="urgency" />
                    </td>
                    <td className="py-3">
                      <StatusBadge status={delivery.status} type="delivery" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
