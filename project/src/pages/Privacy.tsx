import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileCheck, Database, Key, Server, CheckCircle, Heart, Brain } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const securityFeatures = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: "End-to-End Encryption",
    description: "Your data is encrypted in transit and at rest using industry-standard AES-256 encryption."
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Secure Storage",
    description: "Data is stored in ISO 27001 certified data centers with multiple layers of security."
  },
  {
    icon: <Key className="w-6 h-6" />,
    title: "Access Control",
    description: "Strict authentication and authorization protocols protect your information."
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Regular Backups",
    description: "Automated backup systems ensure your data is safe and recoverable."
  }
];

const complianceItems = [
  {
    title: "GDPR Compliance",
    points: [
      "Right to access your data",
      "Right to data portability",
      "Right to be forgotten",
      "Data processing transparency"
    ]
  },
  {
    title: "HIPAA Compliance",
    points: [
      "Protected health information",
      "Security risk assessments",
      "Access monitoring",
      "Breach notification"
    ]
  }
];

const ethicalCommitments = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Ethical AI Usage",
    description: "Our AI systems are designed with transparency and fairness, avoiding bias in recommendations.",
    principles: [
      "Transparent AI decision-making",
      "Regular bias audits",
      "Human oversight of AI systems",
      "Clear AI usage disclosure"
    ]
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "User-Centric Privacy",
    description: "We prioritize your privacy rights and give you control over your data.",
    principles: [
      "Minimal data collection",
      "Purpose-specific usage",
      "User data control",
      "Privacy by design"
    ]
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Data Protection",
    description: "Comprehensive security measures protect your sensitive information.",
    principles: [
      "Regular security audits",
      "Employee training",
      "Incident response plan",
      "Data encryption"
    ]
  }
];

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-violet-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6"
          >
            Your Privacy <span className="font-medium">Matters</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto"
          >
            We prioritize the security and confidentiality of your data with industry-leading 
            protection measures and full compliance with privacy regulations.
          </motion.p>
        </div>
      </section>

      {/* Ethical Commitment Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl text-slate-900 mb-4">
                Our Ethical <span className="font-medium">Commitment</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We are committed to maintaining the highest ethical standards in data protection, 
                AI usage, and user privacy. Your trust is our top priority.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {ethicalCommitments.map((commitment, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 mb-6">
                    {commitment.icon}
                  </div>
                  <h3 className="font-display text-xl font-medium text-slate-900 mb-3">
                    {commitment.title}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {commitment.description}
                  </p>
                  <ul className="space-y-3">
                    {commitment.principles.map((principle, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-600">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        {principle}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-100 text-violet-600 mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-slate-900 mb-4">
                Enterprise-Grade <span className="font-medium">Security</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Your data is protected by multiple layers of security measures and encryption protocols.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-lg font-medium text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="font-display text-2xl font-medium text-slate-900 mb-8 text-center">
                  Regulatory Compliance
                </h2>
                
                <div className="space-y-8">
                  {complianceItems.map((item, index) => (
                    <div key={index} className="border-b border-slate-100 last:border-0 pb-8 last:pb-0">
                      <h3 className="font-display text-lg font-medium text-slate-900 mb-4">
                        {item.title}
                      </h3>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {item.points.map((point, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-600">
                            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-violet-50 rounded-xl">
                  <p className="text-sm text-violet-700 text-center">
                    We regularly update our security measures and compliance standards to ensure 
                    the highest level of data protection for our users.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}