"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Truck,
  Package,
  Bell,
  Users,
  Building2,
  FileText,
  ClipboardList,
  LogOut,
  Menu,
  X,
  Pill,
  Map,
  BarChart3,
  Calendar,
  Thermometer,
  Clock,
  QrCode,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Carte Hôpital", href: "/dashboard/map", icon: Map },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Livraisons", href: "/dashboard/deliveries", icon: Truck },
  { name: "Stocks", href: "/dashboard/stocks", icon: Package },
  { name: "Péremptions", href: "/dashboard/expiration", icon: Clock },
  { name: "Température", href: "/dashboard/temperature", icon: Thermometer },
  { name: "Traçabilité", href: "/dashboard/traceability", icon: QrCode },
  { name: "Planning", href: "/dashboard/scheduling", icon: Calendar },
  { name: "Fournisseurs", href: "/dashboard/suppliers", icon: ShoppingCart },
  { name: "Alertes", href: "/dashboard/alerts", icon: Bell },
  { name: "Demandes", href: "/dashboard/requests", icon: ClipboardList },
  { name: "Services", href: "/dashboard/services", icon: Building2 },
  { name: "Utilisateurs", href: "/dashboard/users", icon: Users },
  { name: "Rapports", href: "/dashboard/reports", icon: FileText },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-sidebar px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Pill className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">MediTrack</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar transition-transform duration-300 lg:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Pill className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">MediTrack</h1>
            <p className="text-xs text-sidebar-foreground/60">Circuit du Médicament</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent">
              <span className="text-sm font-medium text-sidebar-accent-foreground">MD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-sidebar-foreground">Dr. Marie Dupont</p>
              <p className="truncate text-xs text-sidebar-foreground/60">Pharmacien</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
