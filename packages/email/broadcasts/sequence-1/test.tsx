import { Resend } from "resend";
import FootAndAnkle1a from "../../emails/foot-and-ankle-1a.tsx";
import { renderToString } from "react-dom/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const broadcast = await resend.broadcasts.create({
  name: "Sequence 1 - Test - Would you sleep in your Rain Boots?",
  audienceId: "16bf18ea-f785-434f-a980-0e8b039de0e1",
  from: "Thetis Medical <important@send.thetismedical.com>",
  subject: "Would you sleep in your Rain Boots?",
  replyTo: "guy@thetismedical.com",
  html: renderToString(FootAndAnkle1a()),
});

console.log(broadcast);
