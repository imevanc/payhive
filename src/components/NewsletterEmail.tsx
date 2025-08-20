import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export const NewsletterEmail = ({
  subscriberEmail,
  subscribedAt = new Date().toLocaleString(),
}: {
  subscriberEmail: string;
  subscribedAt?: string;
}) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-gray-50 font-sans">
        <Container className="mx-auto py-8 px-4 max-w-2xl">
          <Section className="bg-white rounded-t-lg p-6 border-b-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-500 p-2 rounded-full mr-3">
                  <Text className="text-lg font-bold text-white m-0">📰</Text>
                </div>
                <div>
                  <Text className="text-xl font-bold text-gray-900 m-0">
                    Welcome to PayHive Newsletter!
                  </Text>
                  <Text className="text-sm text-gray-600 m-0">
                    Your gateway to payment industry insights
                  </Text>
                </div>
              </div>
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-800 text-xs font-medium m-0">
                  SUBSCRIBED
                </Text>
              </div>
            </div>
          </Section>

          <Section className="bg-white px-6 py-6">
            <Text className="text-lg font-medium text-gray-900 mb-4 mt-0">
              🎉 Thank you for joining our community!
            </Text>

            <Text className="text-gray-700 leading-relaxed mb-6 mt-0">
              We're excited to have you as part of the PayHive family. You'll
              now receive our weekly newsletter packed with:
            </Text>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <Text className="font-semibold text-blue-900 mb-3 mt-0">
                📈 What you'll get every week:
              </Text>
              <Text className="text-blue-800 text-sm mb-2 mt-0">
                • Latest payment industry trends and analysis
              </Text>
              <Text className="text-blue-800 text-sm mb-2 mt-0">
                • PayHive product updates and new features
              </Text>
              <Text className="text-blue-800 text-sm mb-2 mt-0">
                • Exclusive tips to optimize your payment processing
              </Text>
              <Text className="text-blue-800 text-sm mb-2 mt-0">
                • Case studies from successful merchants
              </Text>
              <Text className="text-blue-800 text-sm m-0">
                • Early access to webinars and events
              </Text>
            </div>

            <Row className="mb-6">
              <Column className="w-20">
                <Text className="text-sm font-medium text-gray-600 m-0">
                  Email:
                </Text>
              </Column>
              <Column>
                <Text className="text-sm text-blue-600 font-mono m-0">
                  {subscriberEmail}
                </Text>
              </Column>
            </Row>

            <Row className="mb-6">
              <Column className="w-20">
                <Text className="text-sm font-medium text-gray-600 m-0">
                  Subscribed:
                </Text>
              </Column>
              <Column>
                <Text className="text-sm text-gray-600 m-0">
                  {subscribedAt}
                </Text>
              </Column>
            </Row>

            <Text className="text-md font-semibold text-gray-900 mb-4 mt-0">
              Get Started with PayHive
            </Text>

            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                href="https://payhive.com/dashboard"
                className="bg-blue-500 text-white font-medium py-3 px-6 rounded no-underline text-sm"
              >
                Access Dashboard
              </Button>
              <Button
                href="https://payhive.com/docs"
                className="bg-gray-600 text-white font-medium py-3 px-6 rounded no-underline text-sm"
              >
                View Documentation
              </Button>
              <Button
                href="https://payhive.com/support"
                className="bg-green-500 text-white font-medium py-3 px-6 rounded no-underline text-sm"
              >
                Get Support
              </Button>
            </div>
          </Section>

          <Section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-6 rounded-lg mb-6">
            <Text className="text-lg font-bold mb-3 mt-0 text-center">
              🚀 Ready to supercharge your payments?
            </Text>
            <Text className="text-blue-100 text-center mb-4 mt-0">
              Join thousands of merchants who trust PayHive for their payment
              processing needs.
            </Text>
            <div className="text-center">
              <Button
                href="https://payhive.com/get-started"
                className="bg-white text-blue-600 font-bold py-3 px-8 rounded no-underline text-sm"
              >
                Start Free Trial
              </Button>
            </div>
          </Section>

          <Section className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <Text className="font-semibold text-yellow-900 mb-2 mt-0">
              💡 Pro Tip:
            </Text>
            <Text className="text-yellow-800 text-sm m-0">
              Add{" "}
              <span className="font-mono bg-yellow-200 px-1 rounded">
                newsletter@payhive.com
              </span>{" "}
              to your contacts to ensure you never miss our updates. Our
              newsletter goes out every Thursday at 10 AM EST.
            </Text>
          </Section>

          <Section className="bg-gray-100 px-6 py-4 rounded-b-lg">
            <Text className="text-center text-gray-700 text-sm mb-4 mt-0">
              Follow us on social media for daily updates:
            </Text>

            <div className="flex justify-center gap-4 mb-4">
              <Button
                href="https://twitter.com/payhive"
                className="bg-blue-400 text-white font-medium py-2 px-4 rounded no-underline text-xs"
              >
                Twitter
              </Button>
              <Button
                href="https://linkedin.com/company/payhive"
                className="bg-blue-700 text-white font-medium py-2 px-4 rounded no-underline text-xs"
              >
                LinkedIn
              </Button>
              <Button
                href="https://youtube.com/payhive"
                className="bg-red-500 text-white font-medium py-2 px-4 rounded no-underline text-xs"
              >
                YouTube
              </Button>
            </div>

            <Hr className="border-gray-300 my-3" />

            <Text className="text-center text-gray-500 text-xs mb-2 mt-0">
              You're receiving this email because you subscribed to PayHive
              Newsletter
            </Text>
            <Text className="text-center text-gray-500 text-xs m-0">
              <a
                href="https://payhive.com/unsubscribe"
                className="text-gray-500 underline"
              >
                Unsubscribe
              </a>{" "}
              |{" "}
              <a
                href="https://payhive.com/preferences"
                className="text-gray-500 underline"
              >
                Update Preferences
              </a>{" "}
              |{" "}
              <a
                href="https://payhive.com/privacy"
                className="text-gray-500 underline"
              >
                Privacy Policy
              </a>
              <br />
              PayHive Inc. | 123 Payment Street, San Francisco, CA 94105
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
