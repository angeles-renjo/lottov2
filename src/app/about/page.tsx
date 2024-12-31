"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Info, Shield, AlertTriangle } from "lucide-react";
import LegalDisclaimer from "@/components/LegalDisclaimer";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-gray-900">About Our Platform</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted source for accessing and tracking PCSO lottery results in
          a convenient and organized manner.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Info className="w-6 h-6 text-blue-500" />
              <CardTitle>Our Mission</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              We aim to provide lottery enthusiasts with a simple, user-friendly
              platform to access publicly available PCSO lottery results. Our
              mission is to make lottery information more accessible while
              maintaining transparency and accuracy in our data presentation.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data & Privacy Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-green-500" />
              <CardTitle>Data Sources & Privacy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Data Sources</h3>
                <p className="text-gray-600">
                  All lottery results and information displayed on our platform
                  are sourced directly from publicly available PCSO channels,
                  including their official website and social media accounts.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Privacy Commitment
                </h3>
                <p className="text-gray-600">
                  We do not collect any personal information or lottery numbers
                  from our users. Our platform serves purely as an informational
                  resource.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <CardTitle>Important Notice</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>This platform is for informational purposes only</li>
              <li>Always verify results with official PCSO channels</li>
              <li>
                We are not responsible for any decisions made based on the
                information provided
              </li>
              <li>
                For claiming prizes and official verification, please visit
                authorized PCSO outlets
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Legal Disclaimer Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <LegalDisclaimer />
      </motion.div>
    </div>
  );
}
