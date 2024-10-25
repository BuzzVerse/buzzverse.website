import { Badge } from 'lucide-react'
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './card'
import Image from 'next/image'

const loraProjects = () => {
  return (
    <section>
        <h2 className="text-3xl font-semibold mb-8 text-center pt-20">
          Our LoRa-Based Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Smart City Waste Management",
              description: "Optimizing waste collection routes with smart bins",
              image: "/placeholder.svg?height=300&width=400",
              badges: ["IoT", "Smart City", "LoRa"],
            },
            {
              title: "Agricultural Monitoring System",
              description:
                "Real-time crop health tracking for optimal management",
              image: "/placeholder.svg?height=300&width=400",
              badges: ["Agriculture", "IoT", "LoRa"],
            },
            {
              title: "Industrial Asset Tracking",
              description:
                "Efficient tracking of equipment in large facilities",
              image: "/placeholder.svg?height=300&width=400",
              badges: ["Industrial IoT", "Asset Tracking", "LoRa"],
            },
          ].map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex}>{badge}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
  )
}

export default loraProjects