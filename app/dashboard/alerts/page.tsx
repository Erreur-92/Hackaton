"use client";

import React from "react"

import { useState } from "react";
import { mockAlerts } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  BellOff,
  ThermometerSun,
  Package,
  Truck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
} from "lucide-react";
import type { Alert } from "@/lib/mock-data";

type AlertStatusFilter = "all" | "new" | "acknowledged" | "resolved";
type AlertTypeFilter = "all" | "stock_low" | "temperature" | "delivery_late" | "delivery_incomplete";

const alertTypeIcons: Record<string, React.ElementType> = {
  stock_low: Package,
  temperature: ThermometerSun,
  delivery_late: Truck,
  delivery_incomplete: AlertTriangle,
};

const alertTypeLabels: Record<string, string> = {
  stock_low: "Stock faible",
  temperature: "Température",
  delivery_late: "Retard livraison",
  delivery_incomplete: "Livraison incomplète",
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [statusFilter, setStatusFilter] = useState<AlertStatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<AlertTypeFilter>("all");

  const filteredAlerts = alerts.filter((alert) => {
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter;
    const matchesType = typeFilter === "all" || alert.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const handleAcknowledge = (alertId: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId ? { ...alert, status: "acknowledged" as const } : alert
      )
    );
  };

  const handleResolve = (alertId: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId ? { ...alert, status: "resolved" as const } : alert
      )
    );
  };

  const newCount = alerts.filter((a) => a.status === "new").length;
  const acknowledgedCount = alerts.filter((a) => a.status === "acknowledged").length;
  const resolvedCount = alerts.filter((a) => a.status === "resolved").length;
  const criticalCount = alerts.filter((a) => a.severity === "critical" && a.status !== "resolved").length;

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alertes et notifications</h1>
          <p className="text-muted-foreground">Suivi des alertes du système</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
              <Bell className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{newCount}</p>
              <p className="text-sm text-muted-foreground">Nouvelles alertes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
              <Clock className="h-6 w-6 text-warning-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{acknowledgedCount}</p>
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
              <p className="text-2xl font-bold text-foreground">{resolvedCount}</p>
              <p className="text-sm text-muted-foreground">Résolues</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{criticalCount}</p>
              <p className="text-sm text-muted-foreground">Critiques actives</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as AlertStatusFilter)}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="new">Nouvelles</SelectItem>
                <SelectItem value="acknowledged">En cours</SelectItem>
                <SelectItem value="resolved">Résolues</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as AlertTypeFilter)}>
              <SelectTrigger className="w-full sm:w-48">
                <Bell className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="stock_low">Stock faible</SelectItem>
                <SelectItem value="temperature">Température</SelectItem>
                <SelectItem value="delivery_late">Retard livraison</SelectItem>
                <SelectItem value="delivery_incomplete">Livraison incomplète</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const IconComponent = alertTypeIcons[alert.type] || AlertTriangle;
          return (
            <Card
              key={alert.id}
              className={`transition-all ${
                alert.status === "resolved"
                  ? "opacity-60"
                  : alert.severity === "critical"
                  ? "border-destructive/30 bg-destructive/5"
                  : ""
              }`}
            >
              <CardContent className="p-4 lg:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        alert.severity === "critical" ? "bg-destructive/10" : "bg-warning/10"
                      }`}
                    >
                      <IconComponent
                        className={`h-5 w-5 ${
                          alert.severity === "critical" ? "text-destructive" : "text-warning-foreground"
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          {alertTypeLabels[alert.type]}
                        </span>
                        <StatusBadge status={alert.status} type="alert" />
                        {alert.severity === "critical" && (
                          <span className="inline-flex items-center rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                            Critique
                          </span>
                        )}
                      </div>
                      <p className="font-medium text-foreground">{alert.message}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(alert.createdAt).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {alert.relatedId && (
                        <p className="text-xs text-muted-foreground">
                          Référence : {alert.relatedId}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 lg:shrink-0">
                    {alert.status === "new" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAcknowledge(alert.id)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Prendre en charge
                      </Button>
                    )}
                    {alert.status === "acknowledged" && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleResolve(alert.id)}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Marquer résolue
                      </Button>
                    )}
                    {alert.status === "resolved" && (
                      <span className="flex items-center gap-1 text-sm text-success">
                        <CheckCircle2 className="h-4 w-4" />
                        Résolue
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredAlerts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BellOff className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-lg font-medium text-foreground">Aucune alerte</p>
              <p className="text-sm text-muted-foreground">Toutes les alertes ont été traitées</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
