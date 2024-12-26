// ErrorCard.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
export default function ErrorCard({ error }: { error: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <p className="text-red-700">{error}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
