import { Battery, Cpu, Globe, Shield, Wifi, Zap } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card'

const loraFeatures = () => {
  return (
    <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Key Features of LoRa
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Wifi,
              title: "Long Range",
              description:
                "Cover several kilometers in urban areas and up to 15 km in rural settings.",
            },
            {
              icon: Zap,
              title: "Low Power",
              description:
                "Devices can operate for years on a single battery charge.",
            },
            {
              icon: Globe,
              title: "Wide Coverage",
              description:
                "A single gateway can cover thousands of end-devices.",
            },
            {
              icon: Shield,
              title: "Secure",
              description: "End-to-end encryption ensures data security.",
            },
            {
              icon: Cpu,
              title: "Scalable",
              description: "Easily scalable for various IoT applications.",
            },
            {
              icon: Battery,
              title: "Energy Efficient",
              description:
                "Optimized for low power consumption in IoT devices.",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="transition-all bg-neutral-800 text-white hover:bg-yellow-700 hover:text-black"
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <feature.icon className="mr-2 h-6 w-6" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
  )
}

export default loraFeatures