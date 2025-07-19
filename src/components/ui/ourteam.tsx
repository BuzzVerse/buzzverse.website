import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from 'next-intl';

interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  description: string | null;
  Role: string[];
  photo?: {
    id: number;
    documentId: string;
    name: string;
    url: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: {
        url: string;
        width: number;
        height: number;
      };
      small?: {
        url: string;
        width: number;
        height: number;
      };
    };
  } | null;
}

interface OurTeamProps {
  teamMembers: TeamMember[];
}

// Funkcja pomocnicza do wyodrębnienia adresu URL obrazu z pola 'photo'
const extractImageUrl = (member: TeamMember) => {
  if (!member.photo?.url) return '';
  
  // Użyj thumbnail jeśli dostępny, w przeciwnym razie oryginalny obraz
  const imageUrl = member.photo.formats?.thumbnail?.url || member.photo.url;
  return `https://strapi.buzzverse.dev${imageUrl}`;
};

// Funkcja pomocnicza do wyodrębnienia roli członka zespołu
const formatRoles = (roles: string[]) => {
  if (!roles || roles.length === 0) return 'Member';
  
  // Tłumaczenie ról na bardziej czytelne nazwy
  const roleTranslations: { [key: string]: string } = {
    'president': 'President',
    'vice-president': 'Vice President',
    'secretary': 'Secretary',
    'tutor': 'Tutor',
    'student': 'Student',
    'member': 'Member',
    'frontend': 'Frontend Developer',
    'backend': 'Backend Developer',
    'embeded': 'Embedded Systems',
    'mobile': 'Mobile Developer',
    'cloud': 'Cloud Engineer'
  };
  
  const translatedRoles = roles.map(role => roleTranslations[role] || role);
  return translatedRoles.slice(0, 2).join(', '); // Pokaż maksymalnie 2 role
};

const OurTeam: React.FC<OurTeamProps> = ({ teamMembers }) => {
  const t = useTranslations('AboutPage');
  console.log("Team Members:", teamMembers);

  if (!teamMembers || teamMembers.length === 0) {
    return <p>No team members found.</p>;
  }

  return (
    <div id="team-section" className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">{t('ourTeamTitle')}</h2>
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
              <p className="text-sm text-muted-foreground mb-2">
                {formatRoles(member.Role)}
              </p>
              {member.description && (
                <p className="text-xs text-muted-foreground">
                  {member.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
