import { graphql } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import {
  getCallRecordingPrice,
  getSummaryPrice,
} from '../../common/consultingPricing';
import ConsultingAppointmentIn30Block from '../../components/ConsultingAppointmentIn30Block';
import ConsultingAppointmentScheduleBlock from '../../components/ConsultingAppointmentScheduleBlock';
import ConsultingPaymentBlock from '../../components/ConsultingPaymentBlock';
import Image from '../../components/Image';
import Layout from '../../components/Layout';
import WidthWrapper from '../../components/WidthWrapper';
import {
  PreparePaymentFormParameters,
  PreparePaymentFormResponse,
} from '../../functions/prepare-payment-form';
import { gridSize, colors } from '../../styles/variables';
import {
  SharpImageFluid,
  SharpImageFixed,
  ConsultingDuration,
  ConsultingAppointmentTime,
} from '../../types';
import {
  Nav,
  Main,
  Header,
  Intro,
  Mark,
  Form,
  FormHeader,
  FormRow,
  FormRowTitle,
  FormRowContent,
  RadioSelect,
  FormNote,
  CheckboxContainer,
  Checkbox,
  Input,
  PaymentSection,
  Questions,
  QuestionsHeader,
  QuestionsGrid,
  Question,
  QuestionHeader,
  Blockquote,
  BlockquoteFooter,
  Footer,
} from './styled';

interface ConsultingPageData {
  talk_cropped: SharpImageFluid;
}

async function preparePaymentForm(
  params: PreparePaymentFormParameters,
): Promise<PreparePaymentFormResponse> {
  const response = await fetch('/.netlify/functions/prepare-payment-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  return response.json();
}

const ConsultingPage = ({ data }: { data: ConsultingPageData }) => {
  const [duration, setDuration] = React.useState(ConsultingDuration.M60);
  const [appointmentTime, setAppointmentTime] = React.useState(
    ConsultingAppointmentTime.SCHEDULE,
  );
  // Using `true` by default to prevent the submit button from jumping
  // “Enabled” → “Disabled” → “Enabled” when switching to the 30-min appointment time
  // for the first time
  const [
    is30MinAppointmentAvailable,
    setIs30MinAppointmentAvailable,
  ] = React.useState(true);
  const [isCallRecordingAdded, setCallRecordingAdded] = React.useState(false);
  const [isSummaryAdded, setSummaryAdded] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      setIsSubmitting(true);

      preparePaymentForm({
        duration,
        appointmentTime,
        isCallRecordingAdded,
        isSummaryAdded,
        email,
      })
        .then((data: PreparePaymentFormResponse) => {
          const div = document.createElement('div');
          div.innerHTML = data.form;
          document.body.appendChild(div);

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          div.querySelector('form')!.submit();
        })
        .catch((e) => {
          // Handle the error simply by resetting into the initial state
          console.error('handleSubmit: encountered an error:', e);
          setIsSubmitting(false);
        });
    },
    [
      setIsSubmitting,
      duration,
      appointmentTime,
      isCallRecordingAdded,
      isSummaryAdded,
      email,
    ],
  );

  return (
    <Layout>
      <Helmet>
        <title>Quick consulting | PerfPerfPerf</title>
        <meta
          name="description"
          content="Learn all you want about your site’s speed. In an hour-long call."
        />
      </Helmet>
      <WidthWrapper>
        <Nav />
        <Main>
          <Header>
            <span style={{ color: colors.brightYellow }}>
              Learn all you want about your site’s speed.
            </span>{' '}
            In an hour.
          </Header>
          <Intro>
            <p>👋 Hi, I’m Ivan Akulov.</p>
            <p>
              I’m a web performance consultant who worked with clients{' '}
              <a href="/#clients">like Google and Framer</a> and wrote
              performance articles{' '}
              <a href="/content">that collected 100K+ views</a>.
            </p>
            <p>
              <Image fluid={data.talk_cropped.childImageSharp.fluid} />
            </p>
            <p>
              How I’m ready to share my knowledge with you.{' '}
              <Mark>
                Let’s learn why your site is slow and how to make it faster
              </Mark>{' '}
              – or anything else you have in mind.
            </p>
          </Intro>
          <Form onSubmit={handleSubmit}>
            <FormHeader>Book a quick consulting session</FormHeader>
            <FormRow>
              <FormRowTitle>For how long:</FormRowTitle>
              <FormRowContent>
                <RadioSelect>
                  <div>
                    <input
                      type="radio"
                      id="duration30"
                      name="duration"
                      value={ConsultingDuration.M30}
                      checked={duration === ConsultingDuration.M30}
                      onChange={() => setDuration(ConsultingDuration.M30)}
                    />
                    <label htmlFor="duration30">30 min</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="duration60"
                      name="duration"
                      value={ConsultingDuration.M60}
                      checked={duration === ConsultingDuration.M60}
                      onChange={() => setDuration(ConsultingDuration.M60)}
                    />
                    <label htmlFor="duration60">60 min</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="duration90"
                      name="duration"
                      value={ConsultingDuration.M90}
                      checked={duration === ConsultingDuration.M90}
                      onChange={() => setDuration(ConsultingDuration.M90)}
                    />
                    <label htmlFor="duration90">90 min</label>
                  </div>
                </RadioSelect>
                <FormNote>
                  We can extend the call if there’s not enough time.
                </FormNote>
              </FormRowContent>
            </FormRow>

            <FormRow>
              <FormRowTitle>When:</FormRowTitle>
              <FormRowContent>
                <RadioSelect>
                  <div>
                    <input
                      type="radio"
                      id="in30"
                      name="appointmentTime"
                      value={ConsultingAppointmentTime.IN_30}
                      checked={
                        appointmentTime === ConsultingAppointmentTime.IN_30
                      }
                      onChange={() =>
                        setAppointmentTime(ConsultingAppointmentTime.IN_30)
                      }
                    />
                    <label htmlFor="in30">In 30 minutes ⚡</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="schedule"
                      name="appointmentTime"
                      value={ConsultingAppointmentTime.SCHEDULE}
                      checked={
                        appointmentTime === ConsultingAppointmentTime.SCHEDULE
                      }
                      onChange={() =>
                        setAppointmentTime(ConsultingAppointmentTime.SCHEDULE)
                      }
                    />
                    <label htmlFor="schedule">Schedule</label>
                  </div>
                </RadioSelect>
                {appointmentTime === ConsultingAppointmentTime.IN_30 && (
                  <ConsultingAppointmentIn30Block
                    paragraphComponent={FormNote}
                    onScheduleClick={() =>
                      setAppointmentTime(ConsultingAppointmentTime.SCHEDULE)
                    }
                    onAvailabilityChange={(isAvailable) =>
                      setIs30MinAppointmentAvailable(isAvailable)
                    }
                  />
                )}
                {appointmentTime === ConsultingAppointmentTime.SCHEDULE && (
                  <ConsultingAppointmentScheduleBlock
                    paragraphComponent={FormNote}
                  />
                )}
              </FormRowContent>
            </FormRow>

            <FormRow>
              <FormRowTitle>Add:</FormRowTitle>
              <FormRowContent>
                <CheckboxContainer>
                  <Checkbox
                    id="call-recording"
                    name="callRecording"
                    checked={isCallRecordingAdded}
                    onChange={(e) => setCallRecordingAdded(e.target.checked)}
                  />
                  <label htmlFor="call-recording">
                    Call recording (${getCallRecordingPrice()})
                  </label>
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    id="call-summary"
                    name="callSummary"
                    checked={isSummaryAdded}
                    onChange={(e) => setSummaryAdded(e.target.checked)}
                  />
                  <label htmlFor="call-summary">
                    Summary of rec&shy;om&shy;men&shy;da&shy;tions, in a
                    tailored pdf (${getSummaryPrice()})
                  </label>
                </CheckboxContainer>
              </FormRowContent>
            </FormRow>

            <FormRow>
              <FormRowTitle>Email:</FormRowTitle>
              <FormRowContent>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormRowContent>
            </FormRow>

            <FormRow>
              <PaymentSection>
                <ConsultingPaymentBlock
                  paragraphComponent={FormNote}
                  duration={duration}
                  appointmentTime={appointmentTime}
                  is30MinAppointmentAvailable={is30MinAppointmentAvailable}
                  isSummaryAdded={isSummaryAdded}
                  isCallRecordingAdded={isCallRecordingAdded}
                  isSubmitting={isSubmitting}
                />
              </PaymentSection>
            </FormRow>
          </Form>
          <Questions>
            <QuestionsHeader>Questions and answers</QuestionsHeader>
            <QuestionsGrid>
              <Question
                // Note: `grid-column: span 2` doesn’t work
                // because it creates a second required column,
                // and the grid never gets to 1 column on narrow screens
                style={{ gridColumn: '1 / -2', marginRight: gridSize * 4 }}
              >
                <QuestionHeader>What can you help with? ✨</QuestionHeader>
                <p>
                  <strong>Loading speed.</strong> I can tell you a lot about:
                  webpack bundles · Chrome DevTools · network waterfalls and
                  “why is it slow?” · React apps and sites · performance
                  monitoring tools.
                </p>
                <p>
                  <strong>Runtime performance.</strong> I can help you to: debug
                  slow scrolling or typing · figure out the source of low FPS.
                </p>
                <p>
                  <strong>I can’t help you with:</strong> memory leaks or
                  database performance. Not my areas of expertise, sorry!
                </p>
              </Question>
              <Question>
                <QuestionHeader>What are others saying? 💬</QuestionHeader>
                <Blockquote>
                  “Interaction with Ivan is dense in terms of knowledge
                  transfer, and I guarantee you that you will learn a lot of new
                  things. On top of all these, he’s a super smooth person to
                  work with. All in all, I cannot recommend Ivan enough!”
                  <BlockquoteFooter>
                    —{' '}
                    <a href="https://twitter.com/cihatimamoglu">
                      Cihat Imamoglu
                    </a>
                    , Senior Software Engineer @ Fat Llama
                  </BlockquoteFooter>
                </Blockquote>
              </Question>
              <Question>
                <QuestionHeader>How can I prepare? ✒️</QuestionHeader>
                <p>
                  If we’re going to talk about you site’s issues: try to make
                  the site publicly accessible (maybe with{' '}
                  <a href="https://ngrok.com/">ngrok</a>). This is not required
                  but would help to profile the site better.
                </p>
                <p>
                  If we’re going to talk about webpack bundles: make sure we’ll
                  be able to see and edit the webpack config. This is needed to
                  run audits.
                </p>
              </Question>
              <Question>
                <QuestionHeader>
                  What if I want a deeper involvement? 🛠️
                </QuestionHeader>
                <p>
                  We’d be happy to make your site as fast as possible – working
                  with your team or even alone. Check out{' '}
                  <a href="https://3perf.com/#services">our other services</a>.
                </p>
              </Question>
              <Question>
                <QuestionHeader>What if I’m unsatisfied? 🤔</QuestionHeader>
                <p>
                  If, during the call, we see that my experience can’t help you
                  – no worries, I’ll refund you immediately.
                </p>
              </Question>
              <Question>
                <QuestionHeader>Another question? 🙋‍♀️</QuestionHeader>
                <p>
                  Just drop me a DM in{' '}
                  <a href="https://twitter.com/iamakulov">Twitter</a> or{' '}
                  <a href="https://t.me/iamakulov">Telegram</a>.
                </p>
              </Question>
            </QuestionsGrid>
          </Questions>
        </Main>

        <Footer license={false} />
      </WidthWrapper>
    </Layout>
  );
};

export default ConsultingPage;

export const query = graphql`
  query {
    talk_cropped: file(relativePath: { eq: "consulting/talk_cropped.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 768, quality: 75) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
