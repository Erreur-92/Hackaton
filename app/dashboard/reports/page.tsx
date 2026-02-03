"use client";

import React from "react"

import { useState } from "react";
import { mockAuditLogs, deliveryChartData, dashboardStats } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  FileSpreadsheet,
  Calendar,
  Filter,
  Truck,
  Package,
  User,
  ClipboardList,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type AuditCategory = "all" | "delivery" | "stock" | "user" | "request" | "system";

const categoryIcons: Record<string, React.ElementType> = {
  delivery: Truck,
  stock: Package,
  user: User,
  request: ClipboardList,
  system: Settings,
};

const categoryLabels: Record<string, string> = {
  delivery: "Livraison",
  stock: "Stock",
  user: "Utilisateur",
  request: "Demande",
  system: "Système",
};

const categoryColors: Record<string, string> = {
  delivery: "bg-primary/10 text-primary",
  stock: "bg-chart-2/10 text-chart-2",
  user: "bg-chart-3/10 text-chart-3",
  request: "bg-warning/10 text-warning-foreground",
  system: "bg-muted text-muted-foreground",
};

// Pie chart data
const deliveryStatusData = [
  { name: "Livrées", value: 156, color: "hsl(var(--success))" },
  { name: "En cours", value: 12, color: "hsl(var(--primary))" },
  { name: "Incidents", value: 3, color: "hsl(var(--destructive))" },
];

// Monthly trend data
const monthlyTrendData = [
  { month: "Jan", deliveries: 420, incidents: 8 },
  { month: "Fév", deliveries: 380, incidents: 5 },
  { month: "Mar", deliveries: 450, incidents: 12 },
  { month: "Avr", deliveries: 520, incidents: 6 },
  { month: "Mai", deliveries: 480, incidents: 9 },
  { month: "Juin", deliveries: 510, incidents: 4 },
];

export default function ReportsPage() {
  const [categoryFilter, setCategoryFilter] = useState<AuditCategory>("all");
  const [dateRange, setDateRange] = useState("week");

  const filteredLogs = mockAuditLogs.filter((log) => {
    return categoryFilter === "all" || log.category === categoryFilter;
  });

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rapports et Audit</h1>
          <p className="text-muted-foreground">Analyses, statistiques et journal des événements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="statistics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="statistics">Statistiques</TabsTrigger>
          <TabsTrigger value="audit">Journal d&apos;audit</TabsTrigger>
        </TabsList>

        {/* Statistics Tab */}
        <TabsContent value="statistics" className="space-y-6">
          {/* Date Range Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Cette semaine</SelectItem>
                    <SelectItem value="month">Ce mois</SelectItem>
                    <SelectItem value="quarter">Ce trimestre</SelectItem>
                    <SelectItem value="year">Cette année</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* KPI Summary */}
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
                    <p className="text-xs text-muted-foreground">Temps moyen</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                    <CheckCircle2 className="h-5 w-5 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{dashboardStats.deliveriesCompleted}</p>
                    <p className="text-xs text-muted-foreground">Livraisons réussies</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{dashboardStats.incidents}</p>
                    <p className="text-xs text-muted-foreground">Incidents</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Weekly Deliveries */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Livraisons de la semaine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deliveryChartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
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

            {/* Delivery Status Pie */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Répartition des livraisons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deliveryStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={4}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {deliveryStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Trend */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Tendance mensuelle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="deliveries"
                        name="Livraisons"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="incidents"
                        name="Incidents"
                        stroke="hsl(var(--destructive))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--destructive))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audit Tab */}
        <TabsContent value="audit" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as AuditCategory)}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="delivery">Livraison</SelectItem>
                    <SelectItem value="stock">Stock</SelectItem>
                    <SelectItem value="user">Utilisateur</SelectItem>
                    <SelectItem value="request">Demande</SelectItem>
                    <SelectItem value="system">Système</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter le journal
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Audit Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Journal des événements</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filteredLogs.map((log) => {
                  const IconComponent = categoryIcons[log.category] || Settings;
                  return (
                    <div key={log.id} className="flex items-start gap-4 p-4 hover:bg-muted/30">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${categoryColors[log.category]}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-foreground">{log.action}</span>
                          <span className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                            {categoryLabels[log.category]}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{log.details}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>{log.userName}</span>
                          <span>-</span>
                          <span>
                            {new Date(log.timestamp).toLocaleString("fr-FR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
