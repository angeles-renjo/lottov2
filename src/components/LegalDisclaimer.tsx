import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function LegalDisclaimer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full bg-slate-50">
        <h1 className="text-4xl font-bold p-8">Legal Disclaimer</h1>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div className="space-y-4 text-lg text-gray-600">
              <p>
                This is an independent platform developed to provide convenient
                access to publicly available lottery information. We operate
                independently and are not affiliated with, endorsed by, or
                connected to the Philippine Charity Sweepstakes Office (PCSO).
              </p>

              <Separator className="my-2" />

              <p>
                All lottery-related information, including draw results, jackpot
                amounts, and draw schedules, is sourced from publicly available
                data. For official verification of results and other
                lottery-related concerns, please visit the official PCSO website
                at
                <a
                  href="https://www.pcso.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  www.pcso.gov.ph
                </a>
                .
              </p>

              <p>
                While we strive to ensure accuracy, we recommend
                cross-referencing all results with official PCSO channels before
                making any claims or decisions based on the information provided
                here.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
