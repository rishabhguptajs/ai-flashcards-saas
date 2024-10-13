"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Subscription {
  title: string;
  description: string;
  status: string;
}

const MySubscription = () => {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<Subscription[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSubscription = () => {
      if (user) {
        const dummyData: Subscription[] = [
          { title: "Premium Plan", description: "Access to all features", status: "Active" },
          { title: "Basic Plan", description: "Limited access to features", status: "Inactive" },
          { title: "Trial Plan", description: "Free trial for 30 days", status: "Active" },
        ];
        setSubscription(dummyData);
      } else {
        toast.error("User not found. Please sign in.");
      }
    };

    fetchSubscription();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-8 bg-gray-800 rounded-lg shadow-lg"
      >
        
        <h1 className="text-3xl font-bold text-center text-orange-400 mb-6">
          My Subscription
        </h1>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
        {subscription.length > 0 ? (
          <ul className="space-y-4">
            {subscription.map((sub, index) => (
              <li key={index} className="p-4 bg-gray-700 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-blue-400">{sub.title}</h2>
                <p className="text-gray-300">{sub.description}</p>
                <p className="text-gray-400">Status: {sub.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-center">No subscriptions found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default MySubscription;
