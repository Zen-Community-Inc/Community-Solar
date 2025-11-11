import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProjects } from "@/lib/mock-data";

export default function Projects() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="section-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Solar Farm Portfolio
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Powering Illinois communities with clean, locally-generated renewable energy
            </p>
          </div>
        </section>

        {/* Portfolio Stats */}
        <section className="section-lg bg-muted">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Total Projects", value: "3" },
                { label: "Combined Capacity", value: "12.7 MW" },
                { label: "Annual Production", value: "28.1M kWh" },
                { label: "Subscribers Served", value: "2,600+" },
              ].map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="section-lg bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Project Locations</h2>
            <Card>
              <CardContent className="p-0">
                <iframe
                  title="Illinois Solar Farm Locations"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-91.5%2C36.9%2C-87.0%2C42.5&amp;layer=mapnik&amp;marker=40.0%2C-89.2"
                  className="rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-lg bg-muted">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <Badge
                        variant={project.status === "Active" ? "default" : "secondary"}
                        className={project.status === "Active" ? "bg-green-500" : ""}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span className="font-semibold">{project.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-semibold">{project.county}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Utility:</span>
                        <span className="font-semibold">{project.utility}</span>
                      </div>
                      <div className="pt-2 mt-2 border-t">
                        <p className="text-muted-foreground text-xs">
                          <strong>Impact:</strong> {project.impact}
                        </p>
                      </div>
                      {project.description && (
                        <p className="text-muted-foreground text-xs pt-2">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
