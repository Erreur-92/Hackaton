import { cn } from "@/lib/utils";

type DeliveryStatus = "pending" | "in_preparation" | "in_transit" | "delivered" | "incident";
type StockStatus = "normal" | "low" | "critical";
type RequestStatus = "pending" | "approved" | "in_preparation" | "in_transit" | "delivered" | "rejected";
type AlertStatus = "new" | "acknowledged" | "resolved";
type UrgencyLevel = "normal" | "urgent" | "critical";

interface StatusBadgeProps {
  status: DeliveryStatus | StockStatus | RequestStatus | AlertStatus | UrgencyLevel;
  type?: "delivery" | "stock" | "request" | "alert" | "urgency";
}

const statusConfig: Record<string, { label: string; className: string }> = {
  // Delivery status
  pending: { label: "En attente", className: "bg-muted text-muted-foreground" },
  in_preparation: { label: "En préparation", className: "bg-primary/10 text-primary" },
  in_transit: { label: "En livraison", className: "bg-chart-2/10 text-chart-2" },
  delivered: { label: "Livré", className: "bg-success/10 text-success" },
  incident: { label: "Incident", className: "bg-destructive/10 text-destructive" },
  
  // Stock status
  normal: { label: "Normal", className: "bg-success/10 text-success" },
  low: { label: "Faible", className: "bg-warning/10 text-warning-foreground" },
  critical: { label: "Critique", className: "bg-destructive/10 text-destructive" },
  
  // Request status
  approved: { label: "Validée", className: "bg-success/10 text-success" },
  rejected: { label: "Rejetée", className: "bg-destructive/10 text-destructive" },
  
  // Alert status
  new: { label: "Nouvelle", className: "bg-destructive/10 text-destructive" },
  acknowledged: { label: "Prise en charge", className: "bg-warning/10 text-warning-foreground" },
  resolved: { label: "Résolue", className: "bg-success/10 text-success" },
  
  // Urgency
  urgent: { label: "Urgent", className: "bg-warning/10 text-warning-foreground" },
};

const urgencyConfig: Record<UrgencyLevel, { label: string; className: string }> = {
  normal: { label: "Normal", className: "bg-muted text-muted-foreground" },
  urgent: { label: "Urgent", className: "bg-warning/10 text-warning-foreground" },
  critical: { label: "Critique", className: "bg-destructive/10 text-destructive" },
};

export function StatusBadge({ status, type = "delivery" }: StatusBadgeProps) {
  let config;
  
  if (type === "urgency") {
    config = urgencyConfig[status as UrgencyLevel];
  } else {
    config = statusConfig[status];
  }
  
  if (!config) {
    config = { label: status, className: "bg-muted text-muted-foreground" };
  }

  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", config.className)}>
      {config.label}
    </span>
  );
}
