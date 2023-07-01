import Navbar from "@/components/navbar";

const Privacy = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-5 md:p-10">
        <div className="md:max-w-8xl md:container mx-auto">
          <div className="mb-5 text-3xl md:text-5xl font-bold">
            Privacy Policy
          </div>
          <p>
            This Privacy Policy outlines the manner in which your personal
            information is collected, used, and protected when you access and
            use our web application, which includes a simple game. We are
            committed to protecting your privacy and ensuring the security of
            your personal information. By using our web app, you consent to the
            practices described in this policy.
          </p>

          <h2 className="mt-5 text-2xl font-bold">
            1. Information We Collect:
          </h2>
          <p>
            <strong className="block mt-4">1.1 Cookies:</strong> We use cookies
            to enhance your experience and provide personalized preferences on
            our web app. The only type of cookie we collect is related to your
            preference for dark mode or light mode. These cookies are strictly
            necessary for the functioning of the app and do not collect any
            personally identifiable information.
          </p>

          <h2 className="mt-5 text-2xl font-bold">2. Use of Information:</h2>
          <p>
            <strong className="block mt-4">2.1 Personalization:</strong> The
            information collected through cookies, specifically your preference
            for dark mode or light mode, is used solely for personalizing your
            experience within the web app. We do not use this information for
            any other purposes or share it with third parties.
          </p>

          <h2 className="mt-5 text-2xl font-bold">3. Data Security:</h2>
          <p>
            <strong className="block mt-4">3.1 Protection Measures:</strong> We
            have implemented appropriate technical and organizational measures
            to safeguard your personal information from unauthorized access,
            disclosure, alteration, or destruction. These measures include data
            encryption, access controls, and regular security assessments.
          </p>
          <p>
            <strong className="block mt-4">3.2 Data Retention:</strong> We
            retain your cookie preference information for as long as it is
            necessary to fulfill the purposes outlined in this policy, unless a
            longer retention period is required or permitted by law.
          </p>

          <h2 className="mt-5 text-2xl font-bold">4. Third-Party Services:</h2>
          <p>
            <strong className="block mt-4">4.1 Third-Party Websites:</strong>{" "}
            Our web app may contain links to third-party websites or services
            that are not owned or controlled by us. This Privacy Policy does not
            apply to such third-party websites or services, and we encourage you
            to review the privacy policies of those websites or services before
            providing any personal information.
          </p>

          <h2 className="mt-5 text-2xl font-bold">
            5. Children&apos;s Privacy:
          </h2>
          <p>
            <strong className="block mt-4">5.1 Age Restrictions:</strong> Our
            web app is intended for general audiences and is not directed at
            children under the age of 13. We do not knowingly collect personal
            information from children under the age of 13. If you believe that
            we may have inadvertently collected personal information from a
            child under the age of 13, please contact us immediately, and we
            will take steps to delete that information from our systems.
          </p>

          <h2 className="mt-5 text-2xl font-bold">
            6. Changes to this Privacy Policy:
          </h2>
          <p>
            <strong className="block mt-4">6.1 Policy Updates:</strong> We
            reserve the right to update or modify this Privacy Policy at any
            time without prior notice. We encourage you to review this policy
            periodically to stay informed of any changes. Your continued use of
            our web app after any modifications to this Privacy Policy will
            signify your acceptance of such changes.
          </p>

          <h2 className="mt-5 text-2xl font-bold">7. Contact Us:</h2>
          <p>
            <strong className="block mt-4">7.1 Questions and Concerns:</strong>{" "}
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or the handling of your personal information, please
            contact us at{" "}
            <a className="underline" href="mailto:ahmad1702@gmail.com">
              ahmad1702@gmail.com
            </a>
            . We will make reasonable efforts to address your inquiry in a
            timely manner.
          </p>

          <p>
            By using our web app, you acknowledge that you have read,
            understood, and agree to be bound by this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
