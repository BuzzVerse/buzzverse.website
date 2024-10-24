import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type TeamMember = {
  name: string
  role: string
  imageUrl: string
}

const teamMembers: TeamMember[] = [
  { name: "Alice Johnson", role: "CEO", imageUrl: "/placeholder.svg?height=100&width=100" },
  { name: "Bob Smith", role: "CTO", imageUrl: "/placeholder.svg?height=100&width=100" },
  { name: "Carol Williams", role: "Lead Designer", imageUrl: "/placeholder.svg?height=100&width=100" },
  { name: "David Brown", role: "Senior Developer", imageUrl: "/placeholder.svg?height=100&width=100" },
  { name: "David Brown", role: "Senior Developer", imageUrl: "/placeholder.svg?height=100&width=100" },
  { name: "Alice Johnson", role: "CEO", imageUrl: "/placeholder.svg?height=100&width=100" },
  { name: "Bob Smith", role: "CTO", imageUrl: "/placeholder.svg?height=100&width=100" },
  { name: "Carol Williams", role: "Lead Designer", imageUrl: "/placeholder.svg?height=100&width=100" },
  { name: "David Brown", role: "Senior Developer", imageUrl: "/placeholder.svg?height=100&width=100" },
  { name: "David Brown", role: "Senior Developer", imageUrl: "/placeholder.svg?height=100&width=100" },
]

export default function OurTeam() {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.name} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="aspect-square relative">
                <Avatar className="w-full h-full rounded-none">
                  <AvatarImage src={member.imageUrl} alt={`${member.name}'s profile`} className="object-cover" />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent className="p-4 text-center">
              <CardTitle className="text-lg font-semibold mb-1">{member.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}