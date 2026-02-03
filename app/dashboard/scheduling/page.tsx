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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  Clock,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  Pill,
  AlertCircle,
  CheckCircle2,
  Timer,
  Users,
  Building2,
  Repeat,
} from "lucide-react";
import { mockPatients, mockRooms } from "@/lib/mock-data";

// Shift types
const shiftTypes = [
  { id: "morning", name: "Matin", time: "06:00 - 14:00", color: "bg-amber-100 text-amber-800 border-amber-200" },
  { id: "afternoon", name: "Après-midi", time: "14:00 - 22:00", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { id: "night", name: "Nuit", time: "22:00 - 06:00", color: "bg-purple-100 text-purple-800 border-purple-200" },
];

// Staff members
const staffMembers = [
  { id: "s1", name: "Dr. Martin", role: "Pharmacien", service: "Pharmacie" },
  { id: "s2", name: "Sophie Durand", role: "Infirmière", service: "Cardiologie" },
  { id: "s3", name: "Jean Petit", role: "Coursier", service: "Logistique" },
  { id: "s4", name: "Marie Blanc", role: "Infirmière", service: "Oncologie" },
  { id: "s5", name: "Paul Richard", role: "Coursier", service: "Logistique" },
  { id: "s6", name: "Anne Leroy", role: "Préparateur", service: "Pharmacie" },
  { id: "s7", name: "Luc Moreau", role: "Infirmier", service: "Réanimation" },
  { id: "s8", name: "Claire Dubois", role: "Infirmière", service: "Neurologie" },
];

// Weekly schedule
const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const scheduleData: Record<string, Record<string, string>> = {
  s1: { Lun: "morning", Mar: "morning", Mer: "morning", Jeu: "afternoon", Ven: "morning", Sam: "", Dim: "" },
  s2: { Lun: "morning", Mar: "morning", Mer: "afternoon", Jeu: "afternoon", Ven: "", Sam: "morning", Dim: "" },
  s3: { Lun: "morning", Mar: "afternoon", Mer: "morning", Jeu: "", Ven: "morning", Sam: "", Dim: "morning" },
  s4: { Lun: "night", Mar: "night", Mer: "", Jeu: "", Ven: "night", Sam: "night", Dim: "" },
  s5: { Lun: "", Mar: "morning", Mer: "morning", Jeu: "morning", Ven: "afternoon", Sam: "morning", Dim: "" },
  s6: { Lun: "afternoon", Mar: "afternoon", Mer: "afternoon", Jeu: "morning", Ven: "", Sam: "", Dim: "" },
  s7: { Lun: "night", Mar: "", Mer: "night", Jeu: "night", Ven: "", Sam: "night", Dim: "night" },
  s8: { Lun: "morning", Mar: "", Mer: "morning", Jeu: "morning", Ven: "morning", Sam: "", Dim: "" },
};

// Medication schedules for patients
const medicationSchedules = [
  { time: "06:00", patient: "Jean Dupont", room: "101", medication: "Paracétamol 1g", status: "completed" },
  { time: "06:00", patient: "Marie Laurent", room: "102", medication: "Amoxicilline 1g", status: "completed" },
  { time: "08:00", patient: "Pierre Martin", room: "103", medication: "Morphine 10mg", status: "completed" },
  { time: "08:00", patient: "François Moreau", room: "201", medication: "Morphine 10mg", status: "completed" },
  { time: "10:00", patient: "Jean Dupont", room: "101", medication: "Morphine 5mg", status: "in-progress" },
  { time: "10:00", patient: "Robert Lefebvre", room: "205", medication: "Héparine 5000UI", status: "pending" },
  { time: "12:00", patient: "André Rousseau", room: "301", medication: "Héparine 5000UI", status: "pending" },
  { time: "12:00", patient: "Pierre Martin", room: "103", medication: "Paracétamol 1g", status: "pending" },
  { time: "14:00", patient: "Marie Laurent", room: "102", medication: "Héparine 5000UI", status: "pending" },
  { time: "14:00", patient: "François Moreau", room: "201", medication: "Paracétamol 1g", status: "pending" },
  { time: "16:00", patient: "Paul Richard", room: "303", medication: "Morphine 10mg", status: "pending" },
  { time: "18:00", patient: "Jean Dupont", room: "101", medication: "Paracétamol 1g", status: "pending" },
  { time: "20:00", patient: "Georges Mercier", room: "208", medication: "Amoxicilline 2g", status: "pending" },
  { time: "22:00", patient: "Pierre Martin", room: "103", medication: "Morphine 10mg", status: "pending" },
];

// Delivery schedules
const deliverySchedules = [
  { time: "07:00", type: "Routine", destination: "Cardiologie", items: 12, courier: "Jean Petit", status: "completed" },
  { time: "08:30", type: "Urgence", destination: "Réanimation", items: 3, courier: "Paul Richard", status: "completed" },
  { time: "09:00", type: "Routine", destination: "Oncologie", items: 8, courier: "Jean Petit", status: "in-progress" },
  { time: "10:30", type: "Routine", destination: "Neurologie", items: 6, courier: "Paul Richard", status: "pending" },
  { time: "11:00", type: "Routine", destination: "Pédiatrie", items: 5, courier: "Jean Petit", status: "pending" },
  { time: "14:00", type: "Routine", destination: "Cardiologie", items: 10, courier: "Paul Richard", status: "pending" },
  { time: "15:30", type: "Urgence", destination: "Oncologie", items: 2, courier: "Jean Petit", status: "pending" },
  { time: "16:00", type: "Routine", destination: "Réanimation", items: 7, courier: "Paul Richard", status: "pending" },
];

export default function SchedulingPage() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedService, setSelectedService] = useState("all");
  const [isAddShiftOpen, setIsAddShiftOpen] = useState(false);

  const getShiftColor = (shiftId: string) => {
    return shiftTypes.find((s) => s.id === shiftId)?.color || "bg-gray-100";
  };

  const getShiftName = (shiftId: string) => {
    return shiftTypes.find((s) => s.id === shiftId)?.name || "";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Timer className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Planning et Ordonnancement</h1>
          <p className="text-muted-foreground">
            Gestion des plannings personnel, traitements et livraisons
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddShiftOpen} onOpenChange={setIsAddShiftOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter Planning
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un Créneau</DialogTitle>
                <DialogDescription>
                  Assignez un créneau de travail à un membre du personnel
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Personnel</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {staffMembers.map((staff) => (
                        <SelectItem key={staff.id} value={staff.id}>
                          {staff.name} - {staff.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
                <div className="grid gap-2">
                  <Label>Créneau</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {shiftTypes.map((shift) => (
                        <SelectItem key={shift.id} value={shift.id}>
                          {shift.name} ({shift.time})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Notes additionnelles..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddShiftOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setIsAddShiftOpen(false)}>Enregistrer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="staff" className="space-y-4">
        <TabsList>
          <TabsTrigger value="staff">
            <Users className="mr-2 h-4 w-4" />
            Personnel
          </TabsTrigger>
          <TabsTrigger value="medications">
            <Pill className="mr-2 h-4 w-4" />
            Traitements
          </TabsTrigger>
          <TabsTrigger value="deliveries">
            <Building2 className="mr-2 h-4 w-4" />
            Livraisons
          </TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Planning Hebdomadaire du Personnel</CardTitle>
                  <CardDescription>Semaine du 15 au 21 Janvier 2024</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">Semaine 3</span>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b p-3 text-left font-medium">Personnel</th>
                      {weekDays.map((day) => (
                        <th key={day} className="border-b p-3 text-center font-medium">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {staffMembers.map((staff) => (
                      <tr key={staff.id} className="border-b">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                              {staff.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{staff.name}</p>
                              <p className="text-xs text-muted-foreground">{staff.role}</p>
                            </div>
                          </div>
                        </td>
                        {weekDays.map((day) => {
                          const shift = scheduleData[staff.id]?.[day];
                          return (
                            <td key={day} className="p-2 text-center">
                              {shift ? (
                                <Badge className={`${getShiftColor(shift)} border`}>
                                  {getShiftName(shift)}
                                </Badge>
                              ) : (
                                <span className="text-xs text-muted-foreground">-</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <span className="text-sm font-medium">Légende:</span>
                {shiftTypes.map((shift) => (
                  <div key={shift.id} className="flex items-center gap-2">
                    <Badge className={`${shift.color} border`}>{shift.name}</Badge>
                    <span className="text-xs text-muted-foreground">{shift.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Personnel Actif</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">5</div>
                <p className="text-sm text-muted-foreground">En service actuellement</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Couverture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">94%</div>
                <p className="text-sm text-muted-foreground">Cette semaine</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Heures Supplémentaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-500">12h</div>
                <p className="text-sm text-muted-foreground">Total cette semaine</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Planning des Traitements - Aujourd'hui</CardTitle>
                  <CardDescription>Administration des médicaments par patient</CardDescription>
                </div>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrer par service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les services</SelectItem>
                    <SelectItem value="reanimation">Réanimation</SelectItem>
                    <SelectItem value="oncologie">Oncologie</SelectItem>
                    <SelectItem value="cardiologie">Cardiologie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {medicationSchedules.map((schedule, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 rounded-lg border p-3 ${
                        schedule.status === "completed"
                          ? "bg-muted/30"
                          : schedule.status === "in-progress"
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                    >
                      <div className="flex h-12 w-16 flex-col items-center justify-center rounded-lg bg-muted">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-bold">{schedule.time}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{schedule.patient}</span>
                          <Badge variant="outline">Ch. {schedule.room}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Pill className="h-3 w-3" />
                          {schedule.medication}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(schedule.status)}
                        <Badge className={getStatusColor(schedule.status)}>
                          {schedule.status === "completed"
                            ? "Administré"
                            : schedule.status === "in-progress"
                            ? "En cours"
                            : "En attente"}
                        </Badge>
                      </div>
                      {schedule.status === "pending" && (
                        <Button size="sm">Administrer</Button>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-xs text-muted-foreground">Administrés</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Timer className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-xs text-muted-foreground">En cours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-8 w-8 text-gray-400" />
                  <div>
                    <p className="text-2xl font-bold">9</p>
                    <p className="text-xs text-muted-foreground">En attente</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-8 w-8 text-amber-500" />
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-xs text-muted-foreground">Retardés</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deliveries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Planning des Livraisons - Aujourd'hui</CardTitle>
              <CardDescription>Tournées et livraisons programmées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deliverySchedules.map((delivery, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 rounded-lg border p-4 ${
                      delivery.status === "completed"
                        ? "bg-muted/30"
                        : delivery.status === "in-progress"
                        ? "border-primary bg-primary/5"
                        : ""
                    }`}
                  >
                    <div className="flex h-14 w-16 flex-col items-center justify-center rounded-lg bg-muted">
                      <span className="text-lg font-bold">{delivery.time}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{delivery.destination}</span>
                        <Badge variant={delivery.type === "Urgence" ? "destructive" : "secondary"}>
                          {delivery.type}
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{delivery.items} articles</span>
                        <span>Coursier: {delivery.courier}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(delivery.status)}
                      <Badge className={getStatusColor(delivery.status)}>
                        {delivery.status === "completed"
                          ? "Livré"
                          : delivery.status === "in-progress"
                          ? "En route"
                          : "Programmé"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Charge par Coursier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">JP</div>
                      <span>Jean Petit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">4 livraisons</span>
                      <Badge>Actif</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-sm font-medium">PR</div>
                      <span>Paul Richard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">4 livraisons</span>
                      <Badge>Actif</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Statistiques du Jour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-primary">8</p>
                    <p className="text-xs text-muted-foreground">Total livraisons</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-500">2</p>
                    <p className="text-xs text-muted-foreground">Complétées</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-500">53</p>
                    <p className="text-xs text-muted-foreground">Articles total</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">98%</p>
                    <p className="text-xs text-muted-foreground">Taux ponctualité</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
