import React from "react";
import LoraInformation from "@/components/ui/loraInformation";
import LoraFeatures from "@/components/ui/loraFeatures";
import WhyLoRa from "@/components/ui/whyLoRa";
import LoraProjects from "@/components/ui/loraProjects";

const page = () => {
  return (
    <div className="container mx-auto py-40 px-4">
      <div className="text-center mb-12">
        <h1 className="text-7xl font-bold mb-4">LoRa Technology</h1>
        <p className="text-xl text-muted-foreground">
          Revolutionizing IoT Communication
        </p>
      </div>
      <LoraInformation />
      <LoraFeatures />
      <WhyLoRa />
      <LoraProjects />
    </div>
  );
};

export default page;
