import { ArticleShell, H2, P, UL, ArticleImage } from "@/components/article/article-shell"
import { ContactCTA } from "@/components/article/contact-cta"
import config from "@/lib/config"

export const metadata = {
  title: `How to Spot a Serious Cash Buyer vs. a Tire-Kicker | ${config.companyName}`,
  description:
    "Five plain questions that filter the real Wisconsin cash home buyers from the flakes, in about five minutes flat.",
}

export default function Page() {
  const area = config.marketName || "the areas we serve"
  return (
    <ArticleShell
      title="How to Tell a Serious Cash Buyer From a Tire-Kicker Before You Share a Single Detail"
      dek="Five plain questions that sort the real buyers from the flakes, in about five minutes flat."
      companyName={config.companyName}
    >
      <P>
        You got the call. Or maybe the postcard. Somebody wants to buy your Wisconsin home for
        cash. As-is. No repairs, no showings, no agents. And part of you thinks, that is exactly
        what I need. Then the other part, the part that has been around the block a few times,
        says hold on. Who is this person, really? Are they serious, or are they going to tie up
        my house for a month and then vanish?
      </P>
      <P>
        If that is where your head is, good. That instinct is not paranoia. It is wisdom you
        earned. After 45-plus years dealing with people, you have learned that the ones who push
        hardest to move fast are usually the ones to slow down with. So let us put that wisdom to
        work properly.
      </P>
      <P>
        Here is what nobody tells you. You do not need to be a real estate lawyer to spot a fake.
        You need five questions and about five minutes. Ask them out loud, on the phone or across
        your kitchen table, and watch what the buyer does. The serious ones answer plainly. The
        tire-kickers get squirmy. That difference is the whole game.
      </P>

      <ArticleImage
        src="/images/adv-local-team.jpg"
        alt="A real local Wisconsin home buying team"
        caption="A real local buyer has a name, a face, and a team you can actually reach. Tire-kickers tend to stay anonymous."
      />

      <H2>1. Do You Actually Buy in Wisconsin, and Can I Look You Up?</H2>
      <P>
        Start here, because this one weeds out half the field right away. A real buyer who works
        across {area} has closed on homes near you, and they can tell you about it. Ask which
        cities or counties they have bought in recently. Ask how long they have operated in
        Wisconsin.
      </P>
      <P>
        Green flag: they name actual towns, they mention real recent purchases, and they are glad
        for you to look them up and read what other Wisconsin sellers said about them. A real
        track record is something they are proud to hand you.
      </P>
      <P>
        Warning sign: vague answers like we buy everywhere, or they cannot point you to a single
        review, a single past seller, or anything you can actually verify. If their whole history
        lives only in their own mouth, that is not history. That is a sales pitch.
      </P>

      <H2>2. Can You Show Me You Actually Have the Funds?</H2>
      <P>
        This is the polite question that scares off exactly the people who should be scared off.
        A genuine cash buyer has the money ready, and they can demonstrate it. Ask them straight:
        can you prove the funds are there before we go any further?
      </P>
      <P>
        Green flag: they say yes without flinching and offer to show you proof of funds. They do
        not get offended. They expect this question, because every careful seller asks it.
      </P>
      <P>
        Warning sign: they dodge, say just trust me, or admit they need to find a partner first.
        That last one is the big tell. A so-called buyer who has to shop your house to someone
        else is not the buyer. They are a middleman hoping to lock you up while they scramble. If
        the money is not theirs and ready, the deal is not real.
      </P>

      <ArticleImage
        src="/images/adv-buyer-at-door.jpg"
        alt="A real Wisconsin cash buyer greeting a homeowner at the front door"
        caption="A funded buyer shows up, looks you in the eye, and answers your questions at the door. No hiding behind a contact form."
      />

      <H2>3. Will You Walk Me Through How You Got to Your Number?</H2>
      <P>
        Anyone can throw out a price. The question is whether they can stand behind it. A real
        buyer will explain how they landed on their offer. What homes near you in Wisconsin have
        sold for, what condition yours is in, what they expect to put into it. It does not have
        to be complicated. It just has to make sense in plain English.
      </P>
      <P>
        Green flag: they break it down clearly and stay patient with follow-up questions. You
        hang up understanding how the number was reached, even if you want time to think about it.
      </P>
      <P>
        Warning sign: the offer is a mystery, or it is suspiciously high. That second one is the
        trap to watch for. Some operators dangle an inflated number to get your signature, then
        knock thousands off once you are committed and tired. They call it a price change after
        the inspection. A buyer who shows the math up front has far less room to pull that move
        on you later.
      </P>

      <H2>4. Are You a Real Person With a Real Local Address?</H2>
      <P>
        You are about to talk about your home, your timeline, maybe your finances. You deserve to
        know who is on the other end. Ask the simple things. Where is your office? Can I reach a
        real person when I call back? What is your name, and who is on your team?
      </P>
      <P>
        Green flag: a local Wisconsin presence, a phone number a human actually answers, and a
        person who gives you their name and stays with you through the conversation. You feel
        like you are dealing with a neighbor, not a call center three time zones away.
      </P>
      <P>
        Warning sign: no address, only a web form, a number that always goes to voicemail, or a
        revolving door of different people who do not know your situation. If you cannot easily
        find them today, imagine how hard they will be to reach on closing day when something
        needs to get done.
      </P>

      <H2>5. Will You Give It to Me in Writing and Let Me Take My Time?</H2>
      <P>
        This is the final filter, and maybe the most important one. A trustworthy buyer wants you
        to feel good about this. They will put the offer in writing so you can read it slowly,
        talk it over with your family or your attorney, and sit with it for a few days. They will
        not rush you.
      </P>
      <P>
        Green flag: the offer comes in writing, the terms are spelled out clearly, and there is
        no artificial clock ticking on you. They say take your time. They mean it.
      </P>
      <P>
        Warning sign: this offer is only good today. Sign now or it is gone. You do not need a
        lawyer, just trust me. Every one of those lines is designed to get you moving before you
        can think clearly. Real buyers know a good offer holds up in daylight. Only the shaky
        ones need you in a hurry.
      </P>

      <ArticleImage
        src="/images/adv-couple-kitchen.jpg"
        alt="A Wisconsin couple weighing a buyer's offer at the kitchen table"
        caption="The right buyer hands you the offer in writing and tells you to take your time. The decision should feel calm, not rushed."
      />

      <H2>The Thing That Makes All Five Work Together</H2>
      <P>
        Notice what these five questions have in common. None of them require you to know anything
        about real estate. They are not trick questions. They are just honest things any decent
        person would answer without making it complicated.
      </P>
      <P>
        And here is the part that should take a weight off. A real Wisconsin buyer welcomes every
        single one of these questions. They are glad you asked about their track record, their
        funds, their math, their address, and their timeline, because answering well is how they
        earn your trust. The act of vetting them is not rude. It is the filter that sorts the real
        buyers from the tire-kickers, all by itself.
      </P>
      <P>Quick recap of what you are listening for:</P>
      <UL>
        <li>A local Wisconsin track record you can look up, not just words.</li>
        <li>Proof of funds, offered without a fuss.</li>
        <li>A number they can explain in plain English.</li>
        <li>A real name, a real address, a human who answers the phone.</li>
        <li>A written offer and no pressure to sign today.</li>
      </UL>
      <P>
        So the next time someone makes you a cash offer, you do not need to be an expert or hire
        a team to protect yourself. Make a cup of coffee, run them through these five questions,
        and trust what you see. If they pass, you may have found a buyer worth talking to. If
        they squirm, you just saved yourself a world of trouble.
      </P>
      <P>
        You have spent decades reading people. This is one more conversation where that skill
        pays off.
      </P>

      <ContactCTA
        phoneDisplay={config.phoneDisplay}
        phoneHref={config.phoneHref}
        smsKeyword={config.smsKeyword}
        heading="Put us through the checklist"
        subheading={`Text us the word ${config.smsKeyword} or call. Ask us anything before you share a single private detail. We welcome the questions.`}
      />
    </ArticleShell>
  )
}
