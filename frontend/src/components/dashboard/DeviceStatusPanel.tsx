import { motion } from "framer-motion";
import { Battery, BatteryLow, Cpu, Mic, MonitorSmartphone, Wifi, WifiOff } from "lucide-react";
import type { ElementType } from "react";
import type { DeviceStatus } from "@/types";

function Row({
  icon: Icon,
  label,
  value,
  ok,
}: {
  icon: ElementType;
  label: string;
  value: string;
  ok: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-ink/5 last:border-0">
      <div className="flex items-center gap-3 text-ink/70">
        <Icon size={16} className={ok ? "text-signal-dark" : "text-severity-critical"} />
        <span className="text-sm">{label}</span>
      </div>
      <span className={`text-sm font-mono ${ok ? "text-ink/60" : "text-severity-critical"}`}>{value}</span>
    </div>
  );
}

export default function DeviceStatusPanel({ status }: { status: DeviceStatus | null }) {
  return (
    <div className="glass rounded-3xl p-7">
      <div className="flex items-center gap-2 text-ink/50 text-sm font-medium mb-2">
        <Cpu size={16} /> Device Status
      </div>
      {!status ? (
        <div className="py-8 text-center text-ink/30 text-sm">Connecting to device…</div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <Row
            icon={status.battery > 20 ? Battery : BatteryLow}
            label="Battery"
            value={`${status.battery}%`}
            ok={status.battery > 20}
          />
          <Row icon={status.wifi ? Wifi : WifiOff} label="Wi-Fi" value={status.wifi ? "Connected" : "Offline"} ok={status.wifi} />
          <Row icon={Mic} label="Microphone" value={status.microphone ? "Active" : "Muted"} ok={status.microphone} />
          <Row icon={MonitorSmartphone} label="OLED / RGB" value={status.oled && status.rgb ? "Online" : "Degraded"} ok={status.oled && status.rgb} />
          <Row icon={Cpu} label="Inference" value={status.inference} ok={status.inference === "running"} />
        </motion.div>
      )}
    </div>
  );
}
