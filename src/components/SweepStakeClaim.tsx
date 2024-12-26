import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { AlertCircle, Wallet } from "lucide-react";

export default function SweepstakesPrizeClaiming() {
  return (
    <div className="space-y-6 max-w-[700px]">
      {/* Sweepstakes Prize Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <Wallet className="w-5 h-5" />
              How to Claim Sweepstakes Prize?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">
                Requirements and Guidelines
              </h3>
              <ol className="space-y-3 text-gray-600">
                <li className="pl-2">
                  Simply bring your two (2) valid IDs and the Winning ticket/s
                  to the PCSO Main Office 2nd Floor Sun Plaza Building, 1507
                  Shaw Boulevard corner Princeton Street, Mandaluyong City 1552
                </li>
                <li className="pl-2">
                  Present your winning ticket/s at the Prize Fund Division,
                  Accounting and Budget Department. Affix your signature at the
                  back of winning ticket/s to establish your absolute ownership.
                  Fill up claim form
                </li>
                <li className="pl-2">
                  Proceed to Treasury Department. Present your Authenticated
                  winning ticket/s and approved claim form for immediate
                  preparation of your check
                </li>
                <li className="pl-2">
                  Have your check signed by the Chairman / General Manager. Then
                  properly receive your winning prize / check at the Treasury
                  Department
                </li>
                <li className="pl-2">
                  Encash your check at the Philippine National Bank / Land Bank
                  of the Philippines located at Ground Floor Sun Plaza Building,
                  1507 Shaw Boulevard corner Princeton Street, Mandaluyong City
                  1552
                </li>
              </ol>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">
                Conditions for Payment of Prizes
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="pl-2">
                  Prizes shall be paid to the holder of share/s of a winning
                  ticket upon presentation and surrender of the same, provided
                  that the ticket/s is/are free from any mutilation, erasure or
                  stain, making any number/s therein illegible, and provided
                  further that no court injunction restraining the PCSO to pay
                  is received before payment
                </li>
                <li className="pl-2">
                  Prizes above ₱10,000.00 are subject to 20% tax pursuant to
                  TRAIN Law
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="w-full bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
              <p className="text-yellow-800">
                Please ensure to keep your tickets safe and secure. Tickets that
                are damaged, mutilated, or tampered with will not be honored for
                prize claims. Always verify your ticket details before leaving
                the outlet.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
