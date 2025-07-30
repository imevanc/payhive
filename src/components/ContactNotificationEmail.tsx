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

export const ContactNotificationEmail = ({
  customerFirstName,
  customerLastName,
  customerTelephoneNumber,
  customerCompany,
  customerEmail,
  subject,
  message,
  submittedAt = new Date().toLocaleString(),
}: {
  customerFirstName: string;
  customerLastName: string;
  customerTelephoneNumber: string;
  customerCompany?: string;
  customerEmail: string;
  subject: string;
  message: string;
  submittedAt?: string;
}) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-gray-50 font-sans">
        <Container className="mx-auto py-8 px-4 max-w-2xl">
          <Section className="bg-white rounded-t-lg p-6 border-b-4 border-green-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-500 p-2 rounded-full mr-3">
                  <Text className="text-lg font-bold text-white m-0">📧</Text>
                </div>
                <div>
                  <Text className="text-xl font-bold text-gray-900 m-0">
                    New Contact Form Submission
                  </Text>
                  <Text className="text-sm text-gray-600 m-0">
                    PayHive Support Portal
                  </Text>
                </div>
              </div>
              <div className="bg-red-100 px-3 py-1 rounded-full">
                <Text className="text-red-800 text-xs font-medium m-0">
                  ACTION REQUIRED
                </Text>
              </div>
            </div>
          </Section>

          <Section className="bg-white px-6 py-4 border-b border-gray-200">
            <Text className="text-lg font-semibold text-gray-900 mb-4 mt-0">
              Customer Information
            </Text>

            <Row className="mb-3">
              <Column className="w-24">
                <Text className="text-sm font-medium text-gray-600 m-0">
                  Name:
                </Text>
              </Column>
              <Column>
                <Text className="text-sm text-gray-900 font-medium m-0">
                  {customerFirstName} {customerLastName}
                </Text>
              </Column>
            </Row>

            <Row className="mb-3">
              <Column className="w-24">
                <Text className="text-sm font-medium text-gray-600 m-0">
                  Telephone Number:
                </Text>
              </Column>
              <Column>
                <Text className="text-sm text-gray-900 font-medium m-0">
                  {customerTelephoneNumber}
                </Text>
              </Column>
            </Row>

            {customerCompany && (
              <Row className="mb-3">
                <Column className="w-24">
                  <Text className="text-sm font-medium text-gray-600 m-0">
                    Company:
                  </Text>
                </Column>
                <Column>
                  <Text className="text-sm text-gray-900 font-medium m-0">
                    {customerCompany}
                  </Text>
                </Column>
              </Row>
            )}

            <Row className="mb-3">
              <Column className="w-24">
                <Text className="text-sm font-medium text-gray-600 m-0">
                  Email:
                </Text>
              </Column>
              <Column>
                <Text className="text-sm text-green-600 font-mono m-0">
                  <a
                    href={`mailto:${customerEmail}`}
                    className="text-green-600 no-underline"
                  >
                    {customerEmail}
                  </a>
                </Text>
              </Column>
            </Row>

            <Row className="mb-3">
              <Column className="w-24">
                <Text className="text-sm font-medium text-gray-600 m-0">
                  Subject:
                </Text>
              </Column>
              <Column>
                <Text className="text-sm text-gray-900 font-medium m-0">
                  {subject}
                </Text>
              </Column>
            </Row>

            <Row>
              <Column className="w-24">
                <Text className="text-sm font-medium text-gray-600 m-0">
                  Submitted:
                </Text>
              </Column>
              <Column>
                <Text className="text-sm text-gray-600 m-0">{submittedAt}</Text>
              </Column>
            </Row>
          </Section>

          <Section className="bg-white px-6 py-4">
            <Text className="text-lg font-semibold text-gray-900 mb-4 mt-0">
              Message Content
            </Text>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <Text className="text-gray-800 leading-relaxed whitespace-pre-wrap m-0">
                {message}
              </Text>
            </div>

            <Text className="text-md font-semibold text-gray-900 mb-3 mt-0">
              Quick Actions
            </Text>

            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                href={`mailto:${customerEmail}?subject=Re: ${subject}&body=Hi ${customerFirstName},%0D%0A%0D%0AThank you for contacting PayHive support.%0D%0A%0D%0A`}
                className="bg-green-500 text-white font-medium py-2 px-4 rounded no-underline text-sm"
              >
                Reply to Customer
              </Button>
              <Button
                href="https://payhive.com/admin/support"
                className="bg-blue-500 text-white font-medium py-2 px-4 rounded no-underline text-sm"
              >
                Open Support Dashboard
              </Button>
              <Button
                href={`?search=${customerEmail}`}
                className="bg-gray-600 text-white font-medium py-2 px-4 rounded no-underline text-sm"
              >
                View Customer Account
              </Button>
            </div>
          </Section>

          <Section className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <Text className="font-semibold text-blue-900 mb-2 mt-0">
              📋 Support Response Guidelines:
            </Text>
            <Text className="text-blue-800 text-sm mb-1 mt-0">
              • Respond within 2 hours during business hours (9 AM - 6 PM EST)
            </Text>
            <Text className="text-blue-800 text-sm mb-1 mt-0">
              • Use the customer's name and reference their specific issue
            </Text>
            <Text className="text-blue-800 text-sm mb-1 mt-0">
              • Check if this is a known issue in our knowledge base first
            </Text>
            <Text className="text-blue-800 text-sm m-0">
              • Update the support ticket status after responding
            </Text>
          </Section>

          <Section className="bg-gray-100 px-6 py-4 rounded-b-lg">
            <Text className="text-center text-gray-600 text-sm mb-2 mt-0">
              This notification was sent to the PayHive support team
            </Text>

            <Hr className="border-gray-300 my-3" />

            <Text className="text-center text-gray-500 text-xs m-0">
              PayHive Support System | Do not reply to this email
              <br />
              For internal support team use only
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
