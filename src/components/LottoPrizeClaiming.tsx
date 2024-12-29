import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import Link from "next/link";

export default function LottoPrizeClaiming() {
  return (
    <div className="space-y-6 max-w-[700px]">
      {/* Lotto Prize Section */}
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
              How to Claim Lotto Prize?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-4 text-gray-600">
              <li className="pl-2">
                Write your name and affix your signature at the back of your
                winning tickets before claiming your prize
              </li>
              <li className="pl-2">
                Prize amounting to{" "}
                <span className="font-medium">₱20.00 up to ₱10,000.00</span> can
                be claimed at any{" "}
                <span className="font-medium">authorized Lotto outlet</span> or
                at the <span className="font-medium">PCSO Branch Offices</span>{" "}
                in your area
              </li>
              <li className="pl-2">
                Prizes from{" "}
                <span className="font-medium">
                  ₱10,001.00 and up to ₱300,000.00
                </span>{" "}
                can be claimed at the PCSO Branch Offices in your area or at the{" "}
                <span className="font-medium">
                  PCSO Main Office 2nd Floor Sun Plaza Building, 1507 Shaw
                  Boulevard corner Princeton Street, Mandaluyong City 1552
                </span>
              </li>
              <li className="pl-2">
                Prizes from <span className="font-medium">₱300,001.00</span> and
                up to <span className="font-medium">JACKPOT PRIZE</span> should
                be validated and claimed at the{" "}
                <span className="font-medium">
                  PCSO Main Office 2nd Floor Sun Plaza Building, 1507 Shaw
                  Boulevard corner Princeton Street, Mandaluyong City 1552
                </span>
              </li>
              <li className="pl-2 italic">
                For the system prize payout, please refer to the Prize Pay-Out
                Chart
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* FAQs Link Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="w-full bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z"
                  />
                </svg>
                <span className="text-blue-700 font-medium">
                  Have more questions about PCSO games and prizes?
                </span>
              </div>
              <Link
                href="https://www.pcso.gov.ph/FAQs.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
              >
                Visit PCSO FAQs
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
