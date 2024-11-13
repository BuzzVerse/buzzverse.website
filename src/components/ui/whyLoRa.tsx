import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'

const whyLoRa = () => {
  return (
    <section className="mb-16 pt-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Why We Use LoRa
        </h2>
        <Tabs defaultValue="iot" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="iot">IoT Applications</TabsTrigger>
            <TabsTrigger value="cost">Cost-Effective</TabsTrigger>
            <TabsTrigger value="security">Secure</TabsTrigger>
            <TabsTrigger value="flexibility">Flexible</TabsTrigger>
          </TabsList>
          <TabsContent value="iot">
            <Card>
              <CardHeader>
                <CardTitle>Ideal for IoT Applications</CardTitle>
                <CardDescription>
                  Long-range, low-power communication for various use cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur sequi adipisci earum eligendi necessitatibus voluptatum. Reprehenderit, reiciendis vel eius omnis aliquam temporibus excepturi a dolore qui nostrum itaque inventore dolorum.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="cost">
            <Card>
              <CardHeader>
                <CardTitle>Cost-Effective Solution</CardTitle>
                <CardDescription>
                  Reduced deployment and maintenance costs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio aut officia possimus tempora minus esse perferendis in, saepe placeat, sunt necessitatibus illum mollitia qui labore. Modi iure voluptatem voluptates vero?
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Secure Data Transmission</CardTitle>
                <CardDescription>
                  End-to-end encryption for data protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi expedita molestias deserunt in, est omnis, dolor voluptatibus praesentium ab corporis, rerum accusamus eaque quas labore nostrum ratione voluptate aliquam reiciendis?
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="flexibility">
            <Card>
              <CardHeader>
                <CardTitle>Flexible Network Options</CardTitle>
                <CardDescription>
                  Private networks or public LoRaWAN
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  LoRa technology offers flexibility in network deployment.
                  Organizations can choose to create their own private LoRa
                  networks for complete control over their IoT infrastructure,
                  or they can utilize public LoRaWAN networks for faster
                  deployment and wider coverage, depending on their specific
                  needs and requirements.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
  )
}

export default whyLoRa