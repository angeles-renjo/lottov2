import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LottoCheckInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Where to Check PCSO Lotto Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Players can watch PCSO lotto draws through multiple official
            channels:
          </p>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-gray-700">PTV Live Broadcast</span>
            </div>

            <div className="space-y-3">
              <p className="text-gray-600 font-medium">
                Official Social Media Channels:
              </p>
              <div className="space-y-2">
                <Link
                  href="https://www.facebook.com/pcsoofficialsocialmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span className="text-blue-600">
                    PCSO Official Facebook Page
                  </span>
                </Link>

                <Link
                  href="https://x.com/pcso_govph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span className="text-blue-600">
                    PCSO Official X (Twitter) Account
                  </span>
                </Link>

                <Link
                  href="https://www.tiktok.com/@pcso_govph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span className="text-blue-600">
                    PCSO Official TikTok Account
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800 text-sm">
              Note: On special occasions and national holidays, PCSO may
              announce draw suspensions in advance. Please check official
              channels for announcements.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
