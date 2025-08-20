type IndicatorType = "contact-us" | "newsletter";

export type SendEmailParams = {
  indicator: IndicatorType;
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
};
