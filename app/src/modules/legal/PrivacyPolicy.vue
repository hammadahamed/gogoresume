<template>
  <HomePagesWrapper>
    <div class="bg-white py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <!-- Header -->
          <div class="bg-black px-8 py-12 text-center">
            <h1 class="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p class="text-indigo-100 text-lg">
              Your privacy matters to us. Learn how we protect your data at
              GoGoResume.
            </p>
            <p class="text-indigo-200 text-sm mt-4">
              Last updated: {{ lastUpdated }}
            </p>
          </div>

          <!-- Content -->
          <div class="px-8 py-12 prose prose-lg max-w-none">
            <!-- Introduction -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Introduction
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Welcome to GoGoResume ("we," "our," or "us"). This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you use our resume building and
                optimization platform, including our web application and Chrome
                extension (collectively, the "Service").
              </p>
              <p class="text-gray-700 leading-relaxed mt-4">
                By using our Service, you consent to the data practices
                described in this policy. If you do not agree with this policy,
                please do not use our Service.
              </p>
            </section>

            <!-- What We Do -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                What GoGoResume Does
              </h2>
              <p class="text-gray-700 leading-relaxed">
                GoGoResume is an AI-powered resume builder and optimization tool
                that helps job seekers:
              </p>
              <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>
                  Create and manage professional resumes using customizable
                  templates
                </li>
                <li>
                  Optimize resume content using artificial intelligence to align
                  with job descriptions
                </li>
                <li>Store and organize multiple versions of resumes</li>
                <li>
                  Access their resumes through our Chrome extension while
                  browsing job sites
                </li>
                <li>
                  Track resume tweaks and optimizations through subscription
                  plans
                </li>
              </ul>
            </section>

            <!-- Information We Collect -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Information We Collect
              </h2>

              <!-- Personal Information -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">
                  Personal Information
                </h3>
                <p class="text-gray-700 mb-4">
                  When you create an account, we collect:
                </p>
                <ul class="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Basic Profile Data:</strong> Name, email address,
                    profile picture
                  </li>
                  <li>
                    <strong>Authentication Data:</strong> Login credentials,
                    Google OAuth tokens (if using Google Sign-in)
                  </li>
                  <li>
                    <strong>Account Settings:</strong> Preferences, subscription
                    status, and account restrictions
                  </li>
                </ul>
              </div>

              <!-- Resume Data -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">
                  Resume and Professional Data
                </h3>
                <p class="text-gray-700 mb-4">
                  To provide our core services, we process:
                </p>
                <ul class="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Resume Content:</strong> Personal information, work
                    experience, education, skills, achievements
                  </li>
                  <li>
                    <strong>Professional Links:</strong> LinkedIn, GitHub,
                    portfolio links, and other professional profiles
                  </li>
                  <li>
                    <strong>Job Descriptions:</strong> Text you provide for
                    resume optimization
                  </li>
                  <li>
                    <strong>Resume Versions:</strong> Multiple saved versions
                    and modification history
                  </li>
                  <li>
                    <strong>Usage Analytics:</strong> Number of tweaks used,
                    optimization history
                  </li>
                </ul>
              </div>

              <!-- Payment Information -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">
                  Payment and Billing Information
                </h3>
                <ul class="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Billing Address:</strong> Street address, city,
                    state, ZIP code, country
                  </li>
                  <li>
                    <strong>Payment Data:</strong> Processed securely through
                    Dodo Payments (we do not store credit card details)
                  </li>
                  <li>
                    <strong>Transaction History:</strong> Payment records,
                    subscription details, refunds
                  </li>
                  <li>
                    <strong>Plan Information:</strong> Current subscription,
                    usage limits, renewal dates
                  </li>
                </ul>
              </div>

              <!-- Technical Information -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">
                  Technical and Usage Information
                </h3>
                <ul class="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Device Information:</strong> Browser type, operating
                    system, device identifiers
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Features used, time spent,
                    pages visited, error logs
                  </li>
                  <li>
                    <strong>IP Address:</strong> For security, fraud prevention,
                    and analytics
                  </li>
                  <li>
                    <strong>Cookies:</strong> Session management, preferences,
                    and analytics
                  </li>
                </ul>
              </div>

              <!-- Chrome Extension Data -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">
                  Chrome Extension Data
                </h3>
                <p class="text-gray-700 mb-4">
                  Our Chrome extension may access:
                </p>
                <ul class="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Active Tab Information:</strong> Only when you
                    explicitly use the extension
                  </li>
                  <li>
                    <strong>Local Storage:</strong> To cache your resume data
                    for offline access
                  </li>
                  <li>
                    <strong>Website Context:</strong> Job posting content you
                    choose to analyze
                  </li>
                  <li>
                    <strong>Form Data:</strong> Only when you actively use our
                    fill-in features
                  </li>
                </ul>
                <div
                  class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4"
                >
                  <p class="text-blue-800 text-sm">
                    <strong>Important:</strong> Our extension only accesses data
                    when you actively use it. We do not monitor your browsing
                    activity or collect data from websites you visit unless you
                    explicitly use our extension features.
                  </p>
                </div>
              </div>
            </section>

            <!-- How We Use Your Information -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                How We Use Your Information
              </h2>
              <p class="text-gray-700 mb-6">We use your information to:</p>

              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-3">
                    Core Service Delivery
                  </h3>
                  <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li>Create, store, and manage your resume profiles</li>
                    <li>
                      Generate AI-powered content optimizations and suggestions
                    </li>
                    <li>Provide resume templates and formatting</li>
                    <li>Enable resume access through our Chrome extension</li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-3">
                    Account Management
                  </h3>
                  <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li>Authenticate and secure your account</li>
                    <li>Process subscription payments and manage billing</li>
                    <li>Track usage limits and subscription benefits</li>
                    <li>Provide customer support and resolve issues</li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-3">
                    Communication
                  </h3>
                  <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li>Send welcome emails and onboarding guidance</li>
                    <li>
                      Notify you about account changes and important updates
                    </li>
                    <li>Respond to your questions and support requests</li>
                    <li>
                      Share relevant tips and best practices (with your consent)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-3">
                    Service Improvement
                  </h3>
                  <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li>Analyze usage patterns to improve our features</li>
                    <li>Monitor system performance and fix bugs</li>
                    <li>Develop new features and functionalities</li>
                    <li>Conduct security monitoring and fraud prevention</li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- Third-Party Services -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Third-Party Services We Use
              </h2>
              <p class="text-gray-700 mb-6">
                To provide our services, we integrate with several trusted
                third-party providers:
              </p>

              <div class="grid md:grid-cols-2 gap-6">
                <div class="border border-gray-200 rounded-lg p-6">
                  <h3 class="font-semibold text-gray-800 mb-3">
                    AI and Content Generation
                  </h3>
                  <ul class="text-sm text-gray-700 space-y-2">
                    <li>
                      <strong>Anthropic Claude:</strong> AI content optimization
                      and suggestions
                    </li>
                    <li>
                      <strong>OpenAI:</strong> Additional AI processing
                      capabilities
                    </li>
                  </ul>
                </div>

                <div class="border border-gray-200 rounded-lg p-6">
                  <h3 class="font-semibold text-gray-800 mb-3">
                    Authentication & Payments
                  </h3>
                  <ul class="text-sm text-gray-700 space-y-2">
                    <li>
                      <strong>Google OAuth:</strong> Secure account
                      authentication
                    </li>
                    <li>
                      <strong>Dodo Payments:</strong> Secure payment processing
                    </li>
                  </ul>
                </div>

                <div class="border border-gray-200 rounded-lg p-6">
                  <h3 class="font-semibold text-gray-800 mb-3">
                    Infrastructure & Storage
                  </h3>
                  <ul class="text-sm text-gray-700 space-y-2">
                    <li>
                      <strong>AWS/Cloudflare:</strong> File storage and content
                      delivery
                    </li>
                    <li><strong>MongoDB:</strong> Database services</li>
                    <li>
                      <strong>Redis:</strong> Caching and session management
                    </li>
                  </ul>
                </div>

                <div class="border border-gray-200 rounded-lg p-6">
                  <h3 class="font-semibold text-gray-800 mb-3">
                    Communication & Analytics
                  </h3>
                  <ul class="text-sm text-gray-700 space-y-2">
                    <li>
                      <strong>ZeptoMail:</strong> Transactional email delivery
                    </li>
                    <li>
                      <strong>Umami Analytics:</strong> Privacy-focused website
                      analytics
                    </li>
                  </ul>
                </div>
              </div>

              <div
                class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6"
              >
                <p class="text-yellow-800 text-sm">
                  <strong>Note:</strong> These third-party services have their
                  own privacy policies. We only share the minimum necessary data
                  required for functionality and ensure all partners meet our
                  privacy standards.
                </p>
              </div>
            </section>

            <!-- Data Security -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                How We Protect Your Data
              </h2>
              <p class="text-gray-700 mb-6">
                We implement multiple layers of security to protect your
                information:
              </p>

              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <div
                    class="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1"
                  >
                    <svg
                      class="w-3 h-3 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800">Encryption</h3>
                    <p class="text-gray-600 text-sm">
                      All data is encrypted in transit and at rest using
                      industry-standard encryption protocols
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <div
                    class="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1"
                  >
                    <svg
                      class="w-3 h-3 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800">Access Controls</h3>
                    <p class="text-gray-600 text-sm">
                      Strict access controls and authentication systems protect
                      against unauthorized access
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <div
                    class="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1"
                  >
                    <svg
                      class="w-3 h-3 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800">
                      Secure Infrastructure
                    </h3>
                    <p class="text-gray-600 text-sm">
                      Our systems are hosted on secure, regularly updated
                      infrastructure with monitoring
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <div
                    class="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1"
                  >
                    <svg
                      class="w-3 h-3 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800">
                      Payment Security
                    </h3>
                    <p class="text-gray-600 text-sm">
                      We never store payment card information - all payments are
                      processed by certified PCI-compliant providers
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Data Retention -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Data Retention
              </h2>
              <p class="text-gray-700 mb-4">
                We retain your data for the following periods:
              </p>
              <ul class="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Active Account Data:</strong> While your account
                  remains active
                </li>
                <li>
                  <strong>Resume Data:</strong> Until you delete specific
                  resumes or close your account
                </li>
                <li>
                  <strong>Payment Records:</strong> 7 years for tax and
                  accounting purposes
                </li>
                <li>
                  <strong>Analytics Data:</strong> Up to 2 years in aggregated,
                  anonymized form
                </li>
                <li>
                  <strong>Support Communications:</strong> 3 years for service
                  improvement
                </li>
              </ul>
              <p class="text-gray-700 mt-4">
                When you delete your account, we will remove your personal data
                within 30 days, except where we're required to retain
                information for legal or regulatory reasons.
              </p>
            </section>

            <!-- Your Rights -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Your Privacy Rights
              </h2>
              <p class="text-gray-700 mb-6">
                You have several rights regarding your personal data:
              </p>

              <div class="space-y-4">
                <div class="border border-gray-200 rounded-lg p-4">
                  <h3 class="font-semibold text-gray-800 mb-2">
                    Access & Portability
                  </h3>
                  <p class="text-gray-600 text-sm">
                    Request a copy of your personal data in a portable format
                  </p>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h3 class="font-semibold text-gray-800 mb-2">Correction</h3>
                  <p class="text-gray-600 text-sm">
                    Update or correct any inaccurate personal information
                  </p>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h3 class="font-semibold text-gray-800 mb-2">Deletion</h3>
                  <p class="text-gray-600 text-sm">
                    Request deletion of your personal data (subject to legal
                    requirements)
                  </p>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h3 class="font-semibold text-gray-800 mb-2">Restriction</h3>
                  <p class="text-gray-600 text-sm">
                    Limit how we process your personal data in certain
                    circumstances
                  </p>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h3 class="font-semibold text-gray-800 mb-2">Objection</h3>
                  <p class="text-gray-600 text-sm">
                    Object to processing based on legitimate interests or direct
                    marketing
                  </p>
                </div>
              </div>

              <p class="text-gray-700 mt-6">
                To exercise these rights, please contact us at
                <a
                  href="mailto:support@gogoresume.com"
                  class="text-indigo-600 hover:underline"
                  >support@gogoresume.com</a
                >. We will respond within 30 days.
              </p>
            </section>

            <!-- Cookies -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Cookies and Tracking
              </h2>
              <p class="text-gray-700 mb-4">
                We use cookies and similar technologies for:
              </p>
              <ul class="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for basic site
                  functionality and security
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings
                  and preferences
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how you
                  use our service (via Umami Analytics)
                </li>
                <li>
                  <strong>Authentication Cookies:</strong> Keep you logged in
                  securely
                </li>
              </ul>
              <p class="text-gray-700 mt-4">
                You can control cookies through your browser settings, though
                some functionality may be limited if essential cookies are
                disabled.
              </p>
            </section>

            <!-- International Transfers -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                International Data Transfers
              </h2>
              <p class="text-gray-700">
                Your data may be processed in countries other than where you
                reside. We ensure appropriate safeguards are in place,
                including:
              </p>
              <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>Standard contractual clauses with service providers</li>
                <li>Adequacy decisions by relevant authorities</li>
                <li>Industry-standard security measures</li>
                <li>Regular compliance audits</li>
              </ul>
            </section>

            <!-- Children's Privacy -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Children's Privacy
              </h2>
              <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <p class="text-red-800">
                  <strong>Important:</strong> Our Service is not intended for
                  children under 16 years of age. We do not knowingly collect
                  personal information from children under 16. If you are a
                  parent or guardian and believe your child has provided us with
                  personal information, please contact us immediately.
                </p>
              </div>
            </section>

            <!-- Changes to Policy -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Changes to This Privacy Policy
              </h2>
              <p class="text-gray-700">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by:
              </p>
              <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>Posting the new Privacy Policy on this page</li>
                <li>Updating the "Last Updated" date</li>
                <li>Sending you an email notification for material changes</li>
                <li>Displaying a prominent notice on our website</li>
              </ul>
              <p class="text-gray-700 mt-4">
                Your continued use of the Service after changes become effective
                constitutes acceptance of the revised Privacy Policy.
              </p>
            </section>

            <!-- Contact -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <p class="text-gray-700 mb-6">
                If you have any questions about this Privacy Policy or our
                privacy practices, please contact us:
              </p>

              <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div class="space-y-3">
                  <div>
                    <h3 class="font-semibold text-gray-800">Email</h3>
                    <p class="text-gray-600">
                      <a
                        href="mailto:support@gogoresume.com"
                        class="text-indigo-600 hover:underline"
                        >support@gogoresume.com</a
                      >
                    </p>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800">Response Time</h3>
                    <p class="text-gray-600">
                      We typically respond within 24-48 hours
                    </p>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800">
                      Data Protection Officer
                    </h3>
                    <p class="text-gray-600">
                      For privacy-specific concerns, email
                      <a
                        href="mailto:support@gogoresume.com"
                        class="text-indigo-600 hover:underline"
                        >support@gogoresume.com</a
                      >
                      with the subject <strong>"Privacy Concerns"</strong>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </HomePagesWrapper>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HomePagesWrapper from "@/modules/home/HomePagesWrapper.vue";

const lastUpdated = ref("September 2025");
</script>

<style scoped>
.prose {
  color: inherit;
}
.prose h2 {
  color: inherit;
}
.prose h3 {
  color: inherit;
}
</style>
