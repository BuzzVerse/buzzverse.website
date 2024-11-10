import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  description: string;
  photo?: {
    url: string;
  };
}

interface OurTeamProps {
  teamMembers: TeamMember[];
}

// Funkcja pomocnicza do wyodrębnienia adresu URL obrazu z pola 'photo'
const extractImageUrl = (member: TeamMember) => {
  return member.photo?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${member.photo.url}` : '';
};

const OurTeam: React.FC<OurTeamProps> = ({ teamMembers }) => {
  console.log("Team Members:", teamMembers);

  if (!teamMembers || teamMembers.length === 0) {
    return <p>No team members found.</p>;
  }

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="aspect-square relative">
                <Avatar className="w-full h-full rounded-none">
                  <AvatarImage
                    src={extractImageUrl(member)} // Wywołanie z member
                    alt={`${member.name}'s profile`}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent className="p-4 text-center">
              <CardTitle className="text-lg font-semibold mb-1">
                {member.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {member.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
