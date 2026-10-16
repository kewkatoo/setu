import PageTransition from "@/components/ui/PageTransition";
import LiveAlertBanner from "@/components/dashboard/LiveAlertBanner";
import CurrentAlertCard from "@/components/dashboard/CurrentAlertCard";
import RecommendedAction from "@/components/dashboard/RecommendedAction";
import DeviceStatusPanel from "@/components/dashboard/DeviceStatusPanel";
import AlertTimeline from "@/components/dashboard/AlertTimeline";
import AccessibilityProfilePanel from "@/components/dashboard/AccessibilityProfilePanel";
import ConnectionStatus from "@/components/dashboard/ConnectionStatus";
import { useLiveAlerts } from "@/hooks/useLiveAlerts";
import { useDeviceStatus } from "@/hooks/useDeviceStatus";
import { useAccessibilityProfile } from "@/hooks/useAccessibilityProfile";

export default function Dashboard() {
  const { currentAlert, history, connection, isListening } = useLiveAlerts();
  const { status } = useDeviceStatus();
  const { profile, saving, changeProfile } = useAccessibilityProfile();

  return (
    <PageTransition>
      <div className="container-page py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-semibold">Live Dashboard</h1>
            <p className="text-ink/50 mt-1">Real-time environmental awareness</p>
          </div>
          <ConnectionStatus state={connection} />
        </div>

        <div className="mb-6">
          <LiveAlertBanner alert={currentAlert} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CurrentAlertCard alert={currentAlert} isListening={isListening} />
            <div className="grid sm:grid-cols-2 gap-6">
              <RecommendedAction alert={currentAlert} />
              <DeviceStatusPanel status={status} />
            </div>
            <AccessibilityProfilePanel profile={profile} saving={saving} onChange={changeProfile} />
          </div>
          <div>
            <AlertTimeline events={history} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
