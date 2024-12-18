import React from "react";
import Image from "next/image";

const loraInformation = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-20">
        <div>
          <h2 className="text-3xl font-semibold mb-4">
            What technology our projects use?
          </h2>
          <p className="text-lg">
            Our science club is trying to develop in embedded systems, we focus on
            communication between devices, we have chosen lora communication
            technologies on an ongoing basis. 
          </p>
        </div>
        <div className="relative h-64 md:h-full flex justify-center">
          <div className="bg-black shadow-lg rounded-3xl p-4 h-full w-full flex items-center justify-center">
            <Image
              src="/loralogo.png"
              alt="LoRa Technology Illustration"
              width={300}
              height={200}
              className="rounded-lg"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default loraInformation;
