"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import SignInModal from "@/components/SignInModal";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "FAQs", path: "/faqs" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  // Hide header/footer on auth pages and admin (admin needs its own nav)
  const isAuthPage =
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/check-eligibility" ||
    pathname === "/onboarding";
  const isAdminPage = pathname === "/admin";

  if (isAuthPage || isAdminPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 w-full border-b border-gray-200 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <Image
              src="/assets/go-zen-logo.jpg"
              alt={siteConfig.company.name}
              width={40}
              height={40}
              className="h-9 w-9 sm:h-11 sm:w-11 shrink-0 object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-bold text-base sm:text-lg text-gray-900">
              {siteConfig.company.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 items-center">
            {navItems.map(({ label, path }) => (
              <Link
                key={path}
                href={path}
                className={`text-sm font-semibold transition-all relative group inline-block ${
                  pathname === path
                    ? "text-yellow-500"
                    : "text-gray-700 hover:text-yellow-500"
                }`}
              >
                {label}
                <span className={`absolute left-0 -bottom-1.5 h-0.5 bg-yellow-400 transition-all ${
                  pathname === path ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {session?.user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden lg:flex items-center gap-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-yellow-400 text-gray-900">
                        {getInitials(session.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">
                      {session.user.name || session.user.email?.split("@")[0] || "User"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  onClick={() => setSignInModalOpen(true)}
                  variant="outline"
                  className="hidden lg:block rounded-lg border-2 border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-yellow-400 hover:bg-yellow-50 transition-all"
                >
                  Sign In
                </Button>
                <Link
                  href="/contact"
                  className="hidden lg:block rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg"
                >
                  Get a Quote
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map(({ label, path }) => (
                    <Link
                      key={path}
                      href={path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium py-3 px-4 rounded-lg transition-colors ${
                        pathname === path
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                  {session?.user ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mt-4 rounded-xl bg-yellow-400 px-6 py-3 text-center text-base font-semibold text-gray-900 hover:bg-yellow-500"
                      >
                        Dashboard
                      </Link>
                      <Button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleSignOut();
                        }}
                        variant="outline"
                        className="w-full border-2"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setSignInModalOpen(true);
                        }}
                        variant="outline"
                        className="mt-4 w-full rounded-xl border-2 px-6 py-3 text-base font-semibold"
                      >
                        Sign In
                      </Button>
                      <Link
                        href="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-xl bg-yellow-400 px-6 py-3 text-center text-base font-semibold text-gray-900 hover:bg-yellow-500"
                      >
                        Get a quote
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full overflow-x-hidden">
        {children}
      </main>

      <footer className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16 mt-auto w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image
                  src="/assets/go-zen-logo.jpg"
                  alt={siteConfig.company.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <span className="font-bold text-sm text-gray-900">
                  {siteConfig.company.name}
                </span>
              </Link>
              <p className="text-sm text-gray-600 mb-4">
                {siteConfig.company.description}
              </p>
              <div className="flex gap-3">
                {siteConfig.contact.social.facebook && (
                  <a href={siteConfig.contact.social.facebook} className="text-gray-400 hover:text-yellow-500 transition-colors" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
                {siteConfig.contact.social.twitter && (
                  <a href={siteConfig.contact.social.twitter} className="text-gray-400 hover:text-yellow-500 transition-colors" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                )}
                {siteConfig.contact.social.instagram && (
                  <a href={siteConfig.contact.social.instagram} className="text-gray-400 hover:text-yellow-500 transition-colors" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
                {siteConfig.contact.social.linkedin && (
                  <a href={siteConfig.contact.social.linkedin} className="text-gray-400 hover:text-yellow-500 transition-colors" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm text-gray-600 hover:text-yellow-500 transition-colors">About Us</Link></li>
                {/* <li><Link href="/projects" className="text-sm text-gray-600 hover:text-yellow-500 transition-colors">Our Projects</Link></li> */}
                <li><Link href="/contact" className="text-sm text-gray-600 hover:text-yellow-500 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="/faqs" className="text-sm text-gray-600 hover:text-yellow-500 transition-colors">FAQs</Link></li>
                {/* <li><Link href="/check-eligibility" className="text-sm text-gray-600 hover:text-yellow-500 transition-colors">Check Eligibility</Link></li> */}
                {/* <li><a href="#" className="text-sm text-gray-600 hover:text-yellow-500 transition-colors">Blog</a></li> */}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-yellow-500 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-600 hover:text-yellow-500 transition-colors">Terms of Service</Link></li>
                <li><span className="text-sm text-gray-600">WCAG 2.1 AA</span></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Made with ♥ in {siteConfig.contact.address.full}
            </p>
          </div>
        </div>
      </footer>

      {/* Sign In Modal */}
      <SignInModal
        open={signInModalOpen}
        onOpenChange={setSignInModalOpen}
        redirectTo="/onboarding"
      />
    </div>
  );
};

export default Layout;
