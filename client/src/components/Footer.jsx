import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import favicon from "../assets/favicon.svg";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Integrations", href: "/integrations" },
        { name: "Roadmap", href: "/roadmap" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Support", href: "/support" },
        { name: "Documentation", href: "/docs" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Careers", href: "/careers" },
        { name: "Privacy", href: "/privacy" }
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand/Logo Section */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2">
              <img src={favicon} alt="Logo" className="w-8 h-8" />
              <h2 className="text-2xl font-bold bg-blue-500 bg-clip-text text-transparent">plan.it</h2>
            </div>
            <p className="mt-4 text-gray-600 max-w-xs">
              Your personal assistant for daily planning and organization. Simplify your workflow and boost productivity.
            </p>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, i) => (
            <div key={i} className="col-span-1">
              <h3 className="font-semibold text-gray-800">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a 
                      href={link.href} 
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 plan.it. All rights reserved.</p>
          
          <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-gray-500">
            <a href="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</a>
            <a href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
            <a href="/cookies" className="hover:text-blue-500 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
     </footer>
    );
  };

  export default Footer;