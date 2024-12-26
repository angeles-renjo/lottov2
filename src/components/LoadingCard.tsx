// LoadingCard.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
export function LoadingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <p className="text-yellow-700">No results available</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
