import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

export default function FooterComponent() {
    return (
        <Footer container className="border border-t-8 border-teal-500">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">
                        <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Vikas</span>
                            Blog
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="About" />
                            <Footer.LinkGroup className="flex flex-col">
                                <Footer.Link
                                    href="https://google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >Link One</Footer.Link>
                                <Footer.Link
                                    href="https://google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >Link Two</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow Us" />
                            <Footer.LinkGroup className="flex flex-col">
                                <Footer.Link
                                    href="https://google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >Link One</Footer.Link>
                                <Footer.Link
                                    href="https://google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >Link Two</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal" />
                            <Footer.LinkGroup className="flex flex-col">
                                <Footer.Link
                                    href="https://google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >Link One</Footer.Link>
                                <Footer.Link
                                    href="https://google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >Link Two</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright
                        href="#"
                        by="Vikas Blog"
                        year={new Date().getFullYear()}
                    />
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook} />
                        <Footer.Icon href="#" icon={BsInstagram} />
                        <Footer.Icon href="#" icon={BsTwitter} />
                    </div>
                </div>
            </div>
        </Footer>
    )
}
