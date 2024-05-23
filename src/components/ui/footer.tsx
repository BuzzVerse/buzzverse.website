import Image from "next/image";


export function Footer() {
    return (
        <div
            className="bg-black justify-center items-center py-6 px-10 font-light"
            id="contact">
            <div className="w-full flex flex-col md:flex-row md:gap-5">
                <div className="w-full flex gap-10  md:w-fit py-3">
                    <div>
                        <h1 className="text-2xl pb-3 mb-4 whitespace-nowrap tracking-wide">
                            Follow us
                        </h1>
                        {/*<Anchor direction="vertical" MenuItems={SocialItems}/>*/}
                        <div className="flex flex-col h-full items-start ml-2 gap-4">
                            <a
                                href="https://github.com/BuzzVerse"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2">
                                <Image
                                    src="/github-mark.svg"
                                    alt="GitHub"
                                    width={30}
                                    height={30}
                                />
                                <p>GitHub</p>
                            </a>
                            <a
                                href="https://www.instagram.com/buzzverse.uz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2">
                                <Image
                                    src="/Instagram.svg"
                                    alt="Instagram"
                                    width={30}
                                    height={30}
                                />
                                <p>Instagram</p>
                            </a>
                            <a
                                href="https://www.linkedin.com/company/buzzverse-uz/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2">
                                <Image
                                    src="/Linkedin.png"
                                    alt="LinkedIn"
                                    width={30}
                                    height={30}
                                />
                                <p>LinkedIn</p>
                            </a>
                        </div>

                    </div>
                    <div>
                        <h1 className="text-2xl pb-3 mb-4 whitespace-nowrap tracking-wide">Contact</h1>
                        <h3 className="flex align-center justify-around flex-col">
                            <a href="mailto:contact@buzzverse.dev">contact@buzzverse.dev</a>
                            <p className="tracking-wide pt-4">64-120 Zielona Góra</p>
                            <p>Poland</p>
                        </h3>
                    </div>
                </div>

                <div className="flex justify-center align-center md:w-full md:justify-end">
                    <Image
                        src="/logo.svg"

                        alt="BuzzVerse Logo"
                        width={500}
                        height={500}
                        className="w-[55%] md:w-[40%] lg:w-[30%] xl:w-[20%] 2xl:w-[10%] py-5"
                    />
                </div>
            </div>
            <div className="flex flex-row justify-between pt-3">
                &copy; BuzzVerse {new Date().getFullYear()}
                <span>
                Made with <span className="text-primary">♡</span> by BuzzVerse Team
                </span>
            </div>
        </div>
    );
}