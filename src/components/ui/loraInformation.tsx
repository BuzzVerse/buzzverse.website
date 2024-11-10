import React from 'react'
import Image from 'next/image'

const loraInformation = () => {
  return (
    <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">What is LoRa?</h2>
            <p className="text-lg mb-4">
              LoRa (Long Range) is a cutting-edge low-power wide-area network
              (LPWAN) technology designed for Internet of Things (IoT)
              applications. It enables long-range communications with minimal
              power consumption, making it ideal for battery-operated devices in
              remote locations.
            </p>
          </div>
          <div className="relative h-64 md:h-full">
            <Image
              src="/loralogo.png"
              alt="LoRa Technology Illustration"
              width={600}
              height={400}
              className="rounded-lg"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
  )
}

export default loraInformation