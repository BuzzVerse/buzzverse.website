import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Github, Instagram, Link, Linkedin, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <Card className="bg-black text-white rounded-none shadow-none z-20">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Follow us</h2>
            <div className="space-y-3">
              <a
                href="https://github.com/BuzzVerse"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.instagram.com/buzzverse.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
              >
                <Instagram size={20} />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/buzzverse-uz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
            <div className="space-y-3">
              <a
                href="mailto:contact@buzzverse.dev"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
              >
                <Mail size={20} />
                <span>contact@buzzverse.dev</span>
              </a>
              <div className="flex items-start space-x-2">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <p>64-120 Zielona Góra</p>
                  <p>Poland</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center md:justify-end">
            <a href="https://botland.com.pl/?utm_source=kn&utm_medium=social-media&utm_campaign=buzzverse-2024" target="_blank" rel="noopener noreferrer">
              <Image
                src="/Botland.png"
                alt="Botland Site"
                width={300}
                height={300}
                className="w-auto h-16 md:h-20"
                
              />
            </a>
            <Image
                src="/logo.svg"
                alt="BuzzVerse Logo"
                width={200}
                height={200}
                className="w-auto h-24 md:h-32"
            />
          </div>
        </div>
      </CardContent>
      <Separator className="bg-neutral-800" />
      <CardFooter className="p-6 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <p className="text-sm text-neutral-400">
          &copy; BuzzVerse {new Date().getFullYear()}
        </p>
        <p className="text-sm text-neutral-400">
          Made with <span className="text-primary">♡</span> by BuzzVerse Team
        </p>
      </CardFooter>
    </Card>
  )
}