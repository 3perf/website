import React from 'react';
import assertExists from 'ts-assert-exists';
import {
  Container,
  HiddenDiv,
  MailchimpForm,
  MailchimpInput,
  MailchimpSubmit,
} from './styled';

const mailchimpSubscribeUrl: string = assertExists(
  process.env.GATSBY_MAILCHIMP_3PERF_SUBSCRIBERS,
  'process.env.GATSBY_MAILCHIMP_3PERF_SUBSCRIBERS is absent',
);

interface MailchimpSubscribeProps {
  className?: string;
  email?: string;
  text: string;
}

const MailchimpSubscribe = ({
  className,
  email = '',
  text,
}: MailchimpSubscribeProps) => {
  return (
    <Container className={className}>
      <p>{text}</p>
      <MailchimpForm
        action={mailchimpSubscribeUrl}
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
      >
        <div>
          <MailchimpInput
            placeholder="Your email"
            type="email"
            defaultValue={email}
            name="EMAIL"
            required={true}
          />
          <MailchimpSubmit type="submit" value="Subscribe" />
        </div>
        <HiddenDiv>
          <input
            type="text"
            name="b_d7d2af05c405078e8f6a48956_6c7cabbc15"
            tabIndex={-1}
            value=""
          />
        </HiddenDiv>
      </MailchimpForm>
    </Container>
  );
};

export default MailchimpSubscribe;
