'use client';

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Building2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { siteConfig } from "@/lib/site-config";
import { useUTM } from "@/hooks/useUTM";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

export default function Contact() {
  const { utms, firstTouch, lastTouch } = useUTM();
  const { trackContact } = useFacebookPixel();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    utility: "",
    bill: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/webhooks/contact-submitted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // UTM tracking data
          ...utms,
          utm_first_touch: firstTouch,
          utm_last_touch: lastTouch,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      // Track Facebook Pixel Contact event
      trackContact({ content_name: 'Contact Form' });

      toast.success("Thank you! We'll be in touch within 24 hours.");
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        address: "",
        utility: "",
        bill: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-yellow-50/80 via-white to-yellow-50/50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-yellow-100/20 via-transparent to-transparent" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-300/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium text-foreground">
                We typically respond within 24 hours
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
              Have questions? Want a personalized quote? We&apos;re here to help you save with community solar.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: siteConfig.contact.email.general,
                  href: `mailto:${siteConfig.contact.email.general}`,
                },
                {
                  icon: Phone,
                  title: "Phone",
                  value: siteConfig.contact.phone.display,
                  href: `tel:${siteConfig.contact.phone.raw}`,
                },
                {
                  icon: MapPin,
                  title: "Office",
                  value: siteConfig.contact.address.full,
                  href: null,
                },
                {
                  icon: Clock,
                  title: "Hours",
                  value: "Mon-Fri 9AM-6PM",
                  href: null,
                },
              ].map((contact, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="pt-6 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-300/20 rounded-full mx-auto mb-3">
                      <contact.icon className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      {contact.title}
                    </div>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="font-semibold text-gray-900 hover:text-yellow-600 transition-colors text-sm"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <div className="font-semibold text-gray-900 text-sm">{contact.value}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 border-0 shadow-lg">
                <CardContent className="pt-6 sm:pt-8 px-4 sm:px-6">
                  {isSubmitted ? (
                    <div className="py-12 text-center">
                      <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                      <p className="text-gray-600 mb-6">
                        Thank you for contacting us. We&apos;ve received your message and will respond within 24 hours.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="mt-4"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                        <p className="text-gray-600">Fill out the form below and we&apos;ll get back to you soon.</p>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="(312) 555-0123"
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                          className="border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Service Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Street address, City, State, Zip"
                        className="border-gray-300"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="utility">Utility Provider</Label>
                        <Select
                          value={formData.utility}
                          onValueChange={(value) =>
                            setFormData({ ...formData, utility: value })
                          }
                        >
                          <SelectTrigger className="border-gray-300 bg-white">
                            <SelectValue placeholder="Select utility" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {siteConfig.service.utilities.map((utility) => (
                              <SelectItem key={utility} value={utility.toLowerCase().replace(/\s+/g, '-')}>
                                {utility}
                              </SelectItem>
                            ))}
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bill">Monthly Electric Bill</Label>
                        <Input
                          id="bill"
                          name="bill"
                          type="number"
                          value={formData.bill}
                          onChange={handleChange}
                          placeholder="$100"
                          className="border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your energy needs or any questions you have..."
                        className="border-gray-300"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold shadow-lg h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-yellow-300/20 rounded-lg">
                        <Building2 className="h-5 w-5 text-yellow-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Enterprise Solutions
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Looking to bring community solar to your multifamily property,
                      business, or nonprofit? We offer custom solutions for:
                    </p>
                    <ul className="text-sm space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span>Apartment buildings & HOAs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span>Commercial properties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span>Nonprofits & places of worship</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span>Municipal buildings</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-yellow-50 to-yellow-100/50 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-yellow-300/30 rounded-lg">
                        <Clock className="h-5 w-5 text-yellow-700" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Quick Response</h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      We typically respond to all inquiries within 24 hours during
                      business days.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
